const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const babel = require("@babel/core");

function loadPage(htmlPath, query, patchData) {
  const htmlDir = path.dirname(htmlPath);
  const html = fs.readFileSync(htmlPath, "utf8");
  const scriptRe = /<script([^>]*)>([\s\S]*?)<\/script>/g;
  let m; const scripts = [];
  while ((m = scriptRe.exec(html))) {
    const attrs = m[1], body = m[2];
    const isBabel = /type="text\/babel"/.test(attrs);
    const srcMatch = attrs.match(/src="([^"]+)"/);
    if (srcMatch && /unpkg\.com/.test(srcMatch[1])) continue;
    scripts.push({ isBabel, src: srcMatch ? srcMatch[1] : null, body });
  }
  const url = "file://" + htmlPath + (query ? "?" + query : "");
  const dom = new JSDOM(`<!doctype html><html><body><div id="root"></div></body></html>`, { url, pretendToBeVisual: true });
  const { window } = dom;
  global.window = window; global.document = window.document; global.navigator = window.navigator;
  global.HTMLElement = window.HTMLElement;
  global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
  window.React = require("react");
  window.ReactDOM = require("react-dom/client");
  window.matchMedia = () => ({ matches: false, addListener(){}, removeListener(){} });
  window.HTMLCanvasElement.prototype.getContext = () => null;
  for (const s of scripts) {
    let code = s.body, label = s.src || "inline";
    if (s.src) code = fs.readFileSync(path.resolve(htmlDir, s.src), "utf8");
    if (s.isBabel) code = babel.transformSync(code, { presets: [["@babel/preset-react", { runtime: "classic" }]] }).code;
    const fn = new window.Function("window", "document", "React", "ReactDOM", "console", "'use strict';\n" + code + "\n//# sourceURL=" + label);
    fn(window, window.document, window.React, window.ReactDOM, console);
    // после исполнения data.js подмешиваем тестовую цель/шаг в план Юлии (newhire),
    // чтобы не зависеть от хрупкой пошаговой симуляции создания цели через UI
    if (label.includes("data.js") && patchData) patchData(window);
  }
  return window;
}

function clickLeaf(window, text, root) {
  const scope = root || window.document;
  const els = Array.from(scope.querySelectorAll(".sk-clickable")).filter(e => e.textContent.includes(text));
  els.sort((a, b) => a.textContent.length - b.textContent.length);
  if (!els.length) throw new Error("Clickable not found: " + text);
  els[0].dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
}

function clickButton(window, text, root) {
  const scope = root || window.document;
  const el = Array.from(scope.querySelectorAll("button")).find(b => b.textContent.trim() === text);
  if (!el) throw new Error("Button not found: " + text);
  el.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
}

function tick(ms) { return new Promise(res => setTimeout(res, ms)); }

const target = path.resolve(__dirname, "..", "manager", "plan.html");

(async () => {
  try {
    // Юлия — план newhire, goalsPublished=false. Подмешиваем готовую цель+шаг напрямую в
    // данные (минуя хрупкую цепочку кликов создания через UI), чтобы протестировать именно
    // поведение MaterialsBadge (пункты 3, 5, 6), а не сам флоу создания (уже покрыт
    // interaction-goal-method.js).
    const w = loadPage(target, "employee=yulia&tab=max", (window) => {
      window.SITE_DATA.plans.newhire.goals = [{
        id: "tg1", title: "Тестовая цель", status: "not_started", dueLabel: "до 20 янв",
        description: "desc", subgoals: [
          { id: "tg1s1", title: "Тестовый шаг", dueLabel: "до 20 янв", status: "not_started", reviewer: "Анна Козлова", checklistRefs: [] },
        ],
      }];
    });
    await tick(150);

    let body = w.document.body.textContent;
    console.log("[Пункт 5] План не опубликован, шаг без материалов — пилюля 'Добавить материалы' видна:", body.includes("Добавить материалы"));
    console.log("[Пункт 6, before] Индикатор 'Полезные материалы: N' пока НЕ виден (материалов ещё нет):", !/Полезные материалы:\s*\d/.test(body));

    // открываем подцель -> открываем пикер -> привязываем материал -> закрываем пикер
    clickLeaf(w, "Тестовый шаг");
    await tick(100);
    body = w.document.body.textContent;
    console.log("SubgoalDrawer открыт (поле 'Проверяющий' видно):", body.includes("Проверяющий"));

    clickButton(w, "Добавить"); // кнопка "+ Добавить" в разделе "Полезные материалы" дровера
    await tick(150);

    const dialogs = w.document.querySelectorAll('[role="dialog"]');
    const picker = dialogs[dialogs.length - 1];
    console.log("Пикер материалов открыт (заголовок 'Полезные материалы' в модалке):", picker.textContent.includes("Полезные материалы"));

    const rows = Array.from(picker.querySelectorAll(".sk-clickable"));
    rows[0].dispatchEvent(new w.MouseEvent("click", { bubbles: true })); // привязываем первый элемент чек-листа
    await tick(80);

    const dialogsAfter = w.document.querySelectorAll('[role="dialog"]');
    const pickerAfter = dialogsAfter[dialogsAfter.length - 1];
    clickButton(w, "Готово", pickerAfter); // закрываем пикер кнопкой "Готово" в футере
    await tick(120);

    body = w.document.body.textContent;
    console.log("[Пункт 6, after] После привязки материала индикатор 'Полезные материалы: 1' появился:", /Полезные материалы:\s*1/.test(body));
    console.log("[Пункт 6, after] Кликабельная пилюля 'Добавить материалы' для этого шага больше не первичный CTA в списке цели:",
      !new RegExp("Тестовый шаг[\\s\\S]{0,80}Добавить материалы").test(body));

    console.log("\nOK: сценарий пунктов 3/5/6 прошёл без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
