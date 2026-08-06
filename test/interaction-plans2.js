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
  // Открыть меню группировки
  const groupBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Без группировки");
  console.log("Group menu button found:", !!groupBtn);
  groupBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  setTimeout(() => {
    const radios = [...w.document.querySelectorAll('[role="radio"]')];
    console.log("Radio options in panel:", radios.length, radios.length === 9 ? "PASS" : "FAIL");
    // выбрать "По статусу"
    const statusRadio = radios.find(r => r.textContent.includes("По статусу"));
    statusRadio.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      const btnLabel = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "По статусу");
      console.log("Button now shows 'По статусу':", !!btnLabel ? "PASS" : "FAIL");
      const groupHeaders = w.document.querySelectorAll("tbody").length; // одна таблица на группу
      console.log("Number of group tables rendered:", groupHeaders, groupHeaders > 1 ? "PASS" : "FAIL");

      // свернуть первую группу
      const firstHeader = [...w.document.querySelectorAll(".sk-clickable")].find(el => el.className.includes("sk-row") && el.textContent.match(/^\D+\d+$/));
      if (firstHeader) {
        const tbodyCountBefore = w.document.querySelectorAll("tbody tr").length;
        firstHeader.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
        setTimeout(() => {
          const tbodyCountAfter = w.document.querySelectorAll("tbody tr").length;
          console.log("Rows after collapsing first group:", tbodyCountBefore, "->", tbodyCountAfter, tbodyCountAfter < tbodyCountBefore ? "PASS" : "FAIL");
        }, 50);
      } else {
        console.log("Could not locate group header row for collapse test (non-fatal)");
      }
    }, 50);
  }, 50);
}, 150);
