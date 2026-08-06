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
const target = path.resolve("/home/claude/proto/hr/templates.html");
const w = loadPage(target);
setTimeout(() => {
  const rowsBefore = w.document.querySelectorAll("tbody tr").length;
  console.log("Rows before:", rowsBefore, rowsBefore === 6 ? "PASS" : "FAIL (expected 6 demo templates)");

  // Поиск
  const input = w.document.querySelector('input[placeholder^="Название"]');
  const setter = Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, "value").set;
  setter.call(input, "frontend");
  input.dispatchEvent(new w.Event("input", { bubbles: true }));
  setTimeout(() => {
    const rowsAfterSearch = w.document.querySelectorAll("tbody tr").length;
    console.log("Rows after search 'frontend':", rowsAfterSearch, rowsAfterSearch === 1 ? "PASS" : "FAIL");

    // очистим поиск, кликнем "Копировать" на первой строке
    setter.call(input, "");
    input.dispatchEvent(new w.Event("input", { bubbles: true }));
    setTimeout(() => {
      const copyBtn = [...w.document.querySelectorAll("button")].find(b => b.title === "" && b.querySelector("svg"));
      // ищем по тултипу — кнопки завернуты в Tooltip span, найдём первую строку -> первая кнопка действий
      const actionCell = w.document.querySelector("tbody tr td:last-child");
      const firstActionBtn = actionCell.querySelector("button");
      firstActionBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      setTimeout(() => {
        const rowsAfterCopy = w.document.querySelectorAll("tbody tr").length;
        console.log("Rows after duplicate click:", rowsAfterCopy, rowsAfterCopy === 7 ? "PASS" : "FAIL");
        console.log("Toast shown:", w.document.body.textContent.includes("скопирован"));
      }, 50);
    }, 50);
  }, 50);
}, 150);
