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
const target = path.resolve("/home/claude/proto/hr/plans.html");
const w = loadPage(target);
setTimeout(() => {
  // По умолчанию: 7 планов всего, 2 скрыты (completed marina, cancelled artem) -> 5 строк
  const rows0 = w.document.querySelectorAll("tbody tr").length;
  console.log("Default visible rows (hide completed/cancelled):", rows0, rows0 === 5 ? "PASS" : "FAIL");

  // Показать скрытые статусы
  const checkbox = w.document.querySelector('input[type="checkbox"]');
  checkbox.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  setTimeout(() => {
    const rows1 = w.document.querySelectorAll("tbody tr").length;
    console.log("After 'show hidden statuses' checked:", rows1, rows1 === 7 ? "PASS" : "FAIL");

    // Клик по индикатору "С риском" (должен остаться 1 — darya)
    const riskCard = [...w.document.querySelectorAll(".sk-title-5")].find(el => el.parentElement && el.parentElement.textContent.includes("С риском"));
    const clickable = riskCard.closest(".sk-clickable") || riskCard.parentElement.parentElement;
    clickable.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      const rows2 = w.document.querySelectorAll("tbody tr").length;
      console.log("After 'С риском' indicator click:", rows2, rows2 === 1 ? "PASS" : "FAIL");

      // Сброс фильтров
      const resetBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Сбросить");
      resetBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      setTimeout(() => {
        const rows3 = w.document.querySelectorAll("tbody tr").length;
        console.log("After reset (hidden statuses checkbox still checked):", rows3, rows3 === 7 ? "PASS" : "FAIL");
      }, 50);
    }, 50);
  }, 50);
}, 150);

// Отдельный прогон: группировка по подразделению
const w2 = loadPage(target);
setTimeout(() => {
  const selects = [...w2.document.querySelectorAll('label')].filter(l => l.textContent.includes("Группировка"));
  // Select компонент кастомный (не нативный select) — кликнем по нему и выберем опцию
  const groupTrigger = [...w2.document.querySelectorAll('div,span')].find(el => el.textContent.trim() === "Группировка" );
  console.log("Group select label present:", !!groupTrigger);
}, 150);
