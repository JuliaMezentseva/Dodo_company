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
  // Полифилл File/Blob API для экспорта CSV (jsdom их не реализует до конца)
  if (!window.URL.createObjectURL) window.URL.createObjectURL = () => "blob:mock";
  if (!window.URL.revokeObjectURL) window.URL.revokeObjectURL = () => {};
  for (const s of scripts) {
    let code = s.body, label = s.src || "inline";
    if (s.src) code = fs.readFileSync(path.resolve(htmlDir, s.src), "utf8");
    if (s.isBabel) code = babel.transformSync(code, { presets: [["@babel/preset-react", { runtime: "classic" }]] }).code;
    const fn = new window.Function("window", "document", "React", "ReactDOM", "console", "'use strict';\n" + code + "\n//# sourceURL=" + label);
    fn(window, window.document, window.React, window.ReactDOM, console);
  }
  return window;
}
const target = path.resolve("/home/claude/proto/hr/vacancies.html");
const w = loadPage(target);
setTimeout(() => {
  const exportBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.includes("Выгрузить отклики"));
  console.log("Export button found:", !!exportBtn);
  try {
    exportBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    console.log("Export click: PASS (no exception)");
  } catch (e) {
    console.log("Export click: FAIL", e.message);
  }
  setTimeout(() => {
    console.log("Toast shown after export:", w.document.body.textContent.includes("скачан") ? "PASS" : "FAIL");
  }, 50);

  // Проверим, что колонка "Изменить" не отображает текстовую кнопку "Изменить"
  console.log("No 'Изменить' text button anywhere:", !w.document.body.textContent.includes("Изменить") ? "PASS" : "FAIL (текст всё ещё есть)");
  console.log("'Отклики' column header present:", w.document.body.textContent.includes("Отклики") ? "PASS" : "FAIL");
  console.log("'Источник' column removed:", !w.document.body.textContent.includes("Источник") ? "PASS" : "FAIL");
}, 200);
