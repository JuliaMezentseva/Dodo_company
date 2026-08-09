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

function tick(ms) { return new Promise(res => setTimeout(res, ms)); }

const target = path.resolve(__dirname, "..", "manager", "plan.html");
const patchGoal = (window) => {
  window.SITE_DATA.plans.newhire.goals = [{
    id: "tg1", title: "Тестовая цель", status: "not_started", dueLabel: "до 20 янв",
    description: "desc", subgoals: [
      { id: "tg1s1", title: "Тестовый шаг", dueLabel: "до 20 янв", status: "not_started", reviewer: "Анна Козлова", checklistRefs: [] },
    ],
  }];
};

async function scenarioListRow() {
  const w = loadPage(target, "employee=yulia&tab=max", patchGoal);
  await tick(150);

  // Прямой клик по пилюле "Добавить материалы" на строке шага (список целей, без
  // предварительного открытия дровера цели/подцели) должен сразу открыть пикер материалов.
  clickLeaf(w, "Добавить материалы");
  await tick(120);

  const dialogs = w.document.querySelectorAll('[role="dialog"]');
  console.log("[List row] Ровно одна модалка открыта (без промежуточного дровера):", dialogs.length === 1 ? "PASS" : "FAIL (" + dialogs.length + ")");
  const picker = dialogs[dialogs.length - 1];
  console.log("[List row] Открылась именно модалка 'Полезные материалы':", picker && picker.textContent.includes("Полезные материалы") ? "PASS" : "FAIL");
  console.log("[List row] Дровер подцели (поле 'Проверяющий') НЕ открыт:", !w.document.body.textContent.includes("Проверяющий") ? "PASS" : "FAIL");
}

async function scenarioGoalDrawer() {
  const w2 = loadPage(target, "employee=yulia&tab=max", patchGoal);
  await tick(150);

  // Открываем дровер цели (как на скриншоте) кликом по карточке цели (кликабельна целиком)
  const titleEl = Array.from(w2.document.querySelectorAll(".sk-title-5")).find(e => e.textContent.trim() === "Тестовая цель");
  titleEl.closest(".sk-clickable").dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
  await tick(100);
  console.log("[GoalDrawer] Дровер цели открыт:", w2.document.body.textContent.includes("Шаги для выполнения") ? "PASS" : "FAIL");

  // Внутри дровера цели кликаем "Добавить материалы" прямо на строке шага
  clickLeaf(w2, "Добавить материалы");
  await tick(120);

  const dialogs2 = w2.document.querySelectorAll('[role="dialog"]');
  console.log("[GoalDrawer] Модалка материалов открылась поверх дровера цели:",
    dialogs2.length >= 1 && dialogs2[dialogs2.length - 1].textContent.includes("Полезные материалы") ? "PASS" : "FAIL");
  console.log("[GoalDrawer] Дровер подцели (поле 'Проверяющий') НЕ открылся:",
    !w2.document.body.textContent.includes("Проверяющий") ? "PASS" : "FAIL");
}

(async () => {
  try {
    await scenarioListRow();
    console.log("");
    await scenarioGoalDrawer();
    console.log("\nOK: прямой переход к материалам работает и со строки списка, и из GoalDrawer");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
