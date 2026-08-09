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
function tick(ms) { return new Promise(res => setTimeout(res, ms)); }

const adaptationTarget = path.resolve(__dirname, "..", "candidate", "adaptation.html");
const planTarget = path.resolve(__dirname, "..", "candidate", "plan.html");

(async () => {
  try {
    // ---- candidate/adaptation.html: ровно одна карточка плана "Пребординг" ----
    const w1 = loadPage(adaptationTarget);
    await tick(150);
    let body = w1.document.body.textContent;
    console.log("adaptation.html: заголовок 'Моя адаптация' показан:", body.includes("Моя адаптация") ? "PASS" : "FAIL");
    console.log("adaptation.html: карточка 'Пребординг' показана:", body.includes("Пребординг") ? "PASS" : "FAIL");
    console.log("adaptation.html: статус 'В процессе' показан:", body.includes("В процессе") ? "PASS" : "FAIL");
    const planLinks = Array.from(w1.document.querySelectorAll('a[href="plan.html"]'));
    console.log("adaptation.html: ровно одна кликабельная карточка плана:", planLinks.length === 1 ? "PASS" : "FAIL (" + planLinks.length + ")");

    // В меню (sidebar) у кандидата — только пункт "Моя адаптация", без "Вакансии" и без
    // групп HR/Помощника.
    console.log("adaptation.html: пункт меню 'Вакансии' отсутствует у кандидата:", !body.includes("Вакансии") ? "PASS" : "FAIL");
    console.log("adaptation.html: шапка показывает кандидата (Максим Орлов), а не сотрудницу:", body.includes("Максим Орлов") && !body.includes("Юлия Мезенцева") ? "PASS" : "FAIL");

    // ---- candidate/plan.html: только 3 вкладки (Минимум/Чат/FAQ), без "План адаптации" ----
    const w2 = loadPage(planTarget);
    await tick(150);
    body = w2.document.body.textContent;
    console.log("plan.html: вкладка 'Базовые действия' показана:", body.includes("Базовые действия") ? "PASS" : "FAIL");
    console.log("plan.html: вкладка 'Чат' показана:", body.includes("Чат") ? "PASS" : "FAIL");
    console.log("plan.html: вкладка 'FAQ' показана:", body.includes("FAQ") ? "PASS" : "FAIL");
    console.log("plan.html: вкладки 'План адаптации' НЕТ (у кандидата нет целей):", !body.includes("План адаптации") ? "PASS" : "FAIL");

    // Чек-лист кандидата — та же схема данных, что у сотрудника (8 элементов на этапе)
    const checkboxes = Array.from(w2.document.querySelectorAll('[role="checkbox"]'));
    console.log("plan.html: чек-лист показывает 8 пунктов:", checkboxes.length === 8 ? "PASS" : "FAIL (" + checkboxes.length + ")");

    // Клик по чекбоксу переключает состояние и обновляет прогресс в заголовке вкладки
    const firstUnchecked = checkboxes.find(c => c.getAttribute("aria-checked") === "false");
    firstUnchecked.dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w2.document.body.textContent;
    console.log("plan.html: после отметки пункта прогресс обновился (не 25%):", !body.includes("Базовые действия 25%") ? "PASS" : "FAIL");

    // Переключение на вкладку "Чат"
    const chatTab = Array.from(w2.document.querySelectorAll("span")).find(el => el.textContent.trim() === "Чат");
    chatTab.dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w2.document.body.textContent;
    const chatTextarea = w2.document.querySelector("textarea");
    console.log("plan.html: вкладка 'Чат' открывается без падений:", body.includes("Общий чат участников плана") && !!chatTextarea ? "PASS" : "FAIL");

    // Переключение на вкладку "FAQ"
    const faqTab = Array.from(w2.document.querySelectorAll("span")).find(el => el.textContent.trim() === "FAQ");
    faqTab.dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
    await tick(80);
    console.log("plan.html: вкладка 'FAQ' открывается без падений:", w2.document.querySelector('[role="dialog"]') === null ? "PASS" : "FAIL");

    // Правая панель: участники плана (руководитель/помощники/HR BP), без блока контрольных точек
    body = w2.document.body.textContent;
    console.log("plan.html: правая панель 'Участники плана' показана:", body.includes("Участники плана") ? "PASS" : "FAIL");
    console.log("plan.html: блока 'Контрольные точки' нет (у кандидата их не бывает):", !body.includes("Контрольные точки") ? "PASS" : "FAIL");

    console.log("\nOK: сценарий роли Кандидат прошёл без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
