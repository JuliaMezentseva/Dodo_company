const fs = require("fs"); const path = require("path");
const { JSDOM } = require("jsdom"); const babel = require("@babel/core");
function loadPage(htmlPath, query) {
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
  window.React = require("react"); window.ReactDOM = require("react-dom/client");
  window.matchMedia = () => ({ matches: false, addListener(){}, removeListener(){} });
  window.HTMLCanvasElement.prototype.getContext = () => null;
  for (const s of scripts) {
    let code = s.body, label = s.src || "inline";
    if (s.src) code = fs.readFileSync(path.resolve(htmlDir, s.src), "utf8");
    if (s.isBabel) code = babel.transformSync(code, { presets: [["@babel/preset-react", { runtime: "classic" }]] }).code;
    const fn = new window.Function("window", "document", "React", "ReactDOM", "console", "'use strict';\n" + code + "\n//# sourceURL=" + label);
    fn(window, window.document, window.React, window.ReactDOM, console);
  }
  return window;
}

function findNavItem(w, label) {
  const span = [...w.document.querySelectorAll("span")].find(el => el.textContent.trim() === label);
  if (!span) return null;
  return span.parentElement;
}
function tick(ms) { return new Promise(res => setTimeout(res, ms)); }

const target = path.resolve("/home/claude/proto/hr/template.html");

(async () => {
  try {
    // tpl_sales: goalsEnabled=false из коробки, но есть 2 предзаполненные КТ (30/60 дней) —
    // не показываются, пока план с целями выключен.
    const w = loadPage(target, "tpl=tpl_sales");
    await tick(150);
    let body = w.document.body.textContent;
    console.log("Goals section is default:", body.includes("План достижения цели адаптации") ? "PASS" : "FAIL");
    console.log("Toggle label updated:", body.includes("Включить план с целями") ? "PASS" : "FAIL");
    console.log("Old 'first version' note removed:", !body.includes("В первой версии цели не создаются") ? "PASS" : "FAIL");
    console.log("Checkpoints hidden while goals disabled:", !body.includes("Контрольная точка по итогам 30 дней") ? "PASS" : "FAIL");

    // Некликабельный пункт навигации не переключает секцию
    const descNav = findNavItem(w, "Описание");
    descNav.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(50);
    console.log("Disabled nav item ('Описание') stays inert:", w.document.body.textContent.includes("Включить план с целями") ? "PASS" : "FAIL");

    // Заглушка "Чек-лист"
    const checklistNav = findNavItem(w, "Чек-лист");
    checklistNav.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(50);
    body = w.document.body.textContent;
    console.log("Checklist stub shown:", body.includes("Базового минимума") ? "PASS" : "FAIL");
    console.log("Checklist stub has no CRUD controls:", !w.document.body.innerHTML.includes("Добавить контрольную точку") ? "PASS" : "FAIL");

    // Возвращаемся в "План достижения цели адаптации" и включаем тумблер — предзаполненные
    // КТ и кнопка добавления должны появиться.
    const goalsNav = findNavItem(w, "План достижения цели адаптации");
    goalsNav.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(50);
    const switchEl = w.document.querySelector('[role="switch"]');
    switchEl.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("After enabling — 2 prefilled checkpoints shown:",
      body.includes("Контрольная точка по итогам 30 дней") && body.includes("Контрольная точка по итогам 60 дней") ? "PASS" : "FAIL");
    console.log("'Добавить контрольную точку' button present:", body.includes("Добавить контрольную точку") ? "PASS" : "FAIL");

    // Добавляем новую КТ через модалку
    const addBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.includes("Добавить контрольную точку"));
    addBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    console.log("Create modal opened:", w.document.body.textContent.includes("Новая контрольная точка") ? "PASS" : "FAIL");

    const titleInput = w.document.querySelector('input[placeholder^="Например"]');
    const setTitle = Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, "value").set;
    setTitle.call(titleInput, "КТ по итогам 90 дней");
    titleInput.dispatchEvent(new w.Event("input", { bubbles: true }));
    const agendaTextarea = w.document.querySelector("textarea");
    const setAgenda = Object.getOwnPropertyDescriptor(w.HTMLTextAreaElement.prototype, "value").set;
    setAgenda.call(agendaTextarea, "Финальные итоги адаптации");
    agendaTextarea.dispatchEvent(new w.Event("input", { bubbles: true }));
    await tick(50);

    const saveBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Добавить" && !b.disabled);
    console.log("Save button enabled after filling required fields:", !!saveBtn ? "PASS" : "FAIL");
    saveBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("New checkpoint appears in list (3rd, numbered '3'):", body.includes("КТ по итогам 90 дней") ? "PASS" : "FAIL");
    console.log("Toast shown after add:", body.includes("добавлена") ? "PASS" : "FAIL");

    // Удаляем добавленную КТ через кнопку корзины на её строке (нужен самый вложенный
    // div-контейнер строки — ровно с двумя кнопками: редактировать и удалить).
    const newRow = [...w.document.querySelectorAll("div")]
      .filter(d => d.textContent.includes("КТ по итогам 90 дней") && d.querySelectorAll("button").length === 2)
      .pop();
    const deleteBtn = newRow.querySelectorAll("button")[1]; // [0] = edit, [1] = delete
    deleteBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("Checkpoint removed after delete click:", !body.includes("КТ по итогам 90 дней") ? "PASS" : "FAIL");
    console.log("Toast shown after delete:", body.includes("удалена") ? "PASS" : "FAIL");

    // tpl_support: goalsEnabled=false, без предзаполненных checkpoints — проверяем включение
    // тумблера с чистого листа (список пуст, но кнопка добавления сразу доступна).
    const w2 = loadPage(target, "tpl=tpl_support");
    await tick(150);
    console.log("[empty tpl] Checkpoints section hidden while goals disabled:",
      !w2.document.body.textContent.includes("Контрольные точки") ? "PASS" : "FAIL");
    const switchEl2 = w2.document.querySelector('[role="switch"]');
    switchEl2.dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
    await tick(80);
    let body2 = w2.document.body.textContent;
    console.log("[empty tpl] Deadline field appears after enabling:", body2.includes("Срок постановки целей") ? "PASS" : "FAIL");
    console.log("[empty tpl] 'Добавить контрольную точку' available even with empty list:", body2.includes("Добавить контрольную точку") ? "PASS" : "FAIL");

    console.log("\nOK: сценарий CRUD контрольных точек шаблона прошёл без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
