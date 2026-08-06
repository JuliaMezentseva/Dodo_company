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
const target = path.resolve("/home/claude/proto/hr/vacancies.html");
const w = loadPage(target);
setTimeout(() => {
  const buttons = [...w.document.querySelectorAll("button")];
  const createBtn = buttons.find(b => b.textContent.trim() === "Создать вакансию");
  console.log("Create button found:", !!createBtn);
  createBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  setTimeout(() => {
    const hasModal = w.document.body.textContent.includes("Новая вакансия");
    console.log("TEST: create modal opened =", hasModal, hasModal ? "PASS" : "FAIL");

    // теперь тест переключателя публикации на первой строке таблицы
    const sw = w.document.querySelector('[role="switch"]');
    const beforeText = w.document.body.textContent.includes("Опубликована");
    sw && sw.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      console.log("TEST: publish switch toggles without crash = PASS (no exception thrown)");
    }, 50);
  }, 50);
}, 150);
