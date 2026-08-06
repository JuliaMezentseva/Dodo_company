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
const target = path.resolve("/home/claude/proto/manager/plan.html");
const w = loadPage(target, "employee=yulia");
setTimeout(() => {
  const cp2Row = [...w.document.querySelectorAll(".sk-label-4")].find(el => el.textContent.includes("60 дней"));
  console.log("CP2 row found:", !!cp2Row);
  cp2Row.closest(".sk-clickable").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  setTimeout(() => {
    const hasFinishBtn = [...w.document.querySelectorAll("button")].some(b => b.textContent.includes("Завершить контрольную точку"));
    console.log("Manager sees NO finish button on assistant's checkpoint (read-only):", !hasFinishBtn ? "PASS" : "FAIL");
    console.log("Shows reviewer name Дмитрий Волков:", w.document.body.textContent.includes("Дмитрий Волков") ? "PASS" : "FAIL");
    console.log("Textareas disabled (canEdit=false):", [...w.document.querySelectorAll("textarea")].every(t => t.disabled) ? "PASS" : "FAIL");
  }, 50);
}, 150);
