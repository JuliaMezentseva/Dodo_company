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
const target = path.resolve("/home/claude/proto/hr/queue.html");
const w = loadPage(target);
setTimeout(() => {
  // Пилюли событий — первая ("Все события") активна по умолчанию, всего 5 штук.
  const pills = [...w.document.querySelectorAll("button")].filter(b => /Все события|Приём на работу|Перевод|Возврат из отпуска|Стажировка/.test(b.textContent));
  console.log("Event pills found:", pills.length, pills.length >= 5 ? "PASS" : "FAIL");

  // Колонка "Причина появления в очереди" убрана из таблицы "К назначению".
  const headers = [...w.document.querySelectorAll("th")].map(th => th.textContent.trim());
  const hasReasonColumn = headers.includes("Причина появления в очереди");
  console.log("Reason column removed:", !hasReasonColumn ? "PASS" : "FAIL", headers);

  // Описание страницы удалено.
  const bodyText = w.document.body.textContent;
  const hasDescription = bodyText.includes("Сотрудники и кандидаты, которым нужно назначить план");
  console.log("Page description removed:", !hasDescription ? "PASS" : "FAIL");

  // Дата события отформатирована в человекочитаемом виде (напр. "12 авг 2026").
  const hasReadableDate = /\d{1,2}\s(янв|фев|мар|апр|мая|июн|июл|авг|сен|окт|ноя|дек)\s20\d{2}/.test(bodyText);
  console.log("Readable event date format present:", hasReadableDate ? "PASS" : "FAIL");

  // Открыть панель "Фильтры" и проверить новые поля: Должность, Подразделение, Руководитель.
  const filtersBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim().startsWith("Фильтры"));
  console.log("Filters button found:", !!filtersBtn ? "PASS" : "FAIL");
  filtersBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  setTimeout(() => {
    const spanTexts = [...w.document.querySelectorAll("span")].map(s => s.textContent.trim());
    const hasPosition = spanTexts.includes("Должность");
    const hasDepartment = spanTexts.includes("Подразделение");
    const hasManager = spanTexts.includes("Руководитель");
    console.log("Position filter present:", hasPosition ? "PASS" : "FAIL");
    console.log("Department filter present:", hasDepartment ? "PASS" : "FAIL");
    console.log("Manager filter present:", hasManager ? "PASS" : "FAIL");

    // Клик по пилюле "Приём на работу" должен отфильтровать таблицу.
    const hirePill = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim().startsWith("Приём на работу"));
    const rowsBefore = w.document.querySelectorAll("tbody tr").length;
    hirePill.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      const rowsAfter = w.document.querySelectorAll("tbody tr").length;
      console.log("Rows after filtering by 'Приём на работу':", rowsBefore, "->", rowsAfter, rowsAfter <= rowsBefore && rowsAfter > 0 ? "PASS" : "FAIL");
    }, 50);
  }, 50);
}, 150);
