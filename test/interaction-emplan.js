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
const target = path.resolve("/home/claude/proto/employee/plan.html");
const w = loadPage(target, "plan=onboarding");
setTimeout(() => {
  // 0. Переключиться на вкладку "Роскошный максимум" — цели теперь скрыты за сегмент-контролом
  const maxTab = [...w.document.querySelectorAll("span")].find(el => el.textContent.includes("Роскошный максимум"));
  console.log("Found 'Роскошный максимум' tab:", !!maxTab);
  if (maxTab) maxTab.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));

setTimeout(() => {
  // 1. Открыть подцель "не начата" (g3s1) и взять в работу
  const notStartedRow = [...w.document.querySelectorAll(".sk-label-3-regular")].find(el => el.textContent.includes("Довести 3 сделки до этапа"));
  console.log("Found not_started subgoal row:", !!notStartedRow);
  notStartedRow.closest(".sk-clickable").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  setTimeout(() => {
    const takeBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Взять в работу");
    console.log("'Взять в работу' button present:", !!takeBtn);
    takeBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      console.log("Toast after taking subgoal:", w.document.body.textContent.includes("взята в работу") ? "PASS" : "FAIL");
      const submitBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Отправить на подтверждение");
      console.log("'Отправить на подтверждение' now available:", !!submitBtn ? "PASS" : "FAIL");
      submitBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      setTimeout(() => {
        console.log("Toast after submit:", w.document.body.textContent.includes("Отправлено на подтверждение") ? "PASS" : "FAIL");

        // 2. Переключиться обратно на "Базовый минимум" и отметить пункт чек-листа выполненным
        const minTab = [...w.document.querySelectorAll("span")].find(el => el.textContent.includes("Базовый минимум"));
        if (minTab) minTab.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
        const checkboxes = [...w.document.querySelectorAll('[role="checkbox"]')];
        console.log("Checklist checkboxes found:", checkboxes.length);
        const target = checkboxes.find(c => c.getAttribute("aria-checked") === "false");
        if (target) {
          target.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
          setTimeout(() => {
            console.log("Checkbox toggled without crash: PASS");
          }, 30);
        }
      }, 50);
    }, 50);
  }, 50);
}, 150);
}, 150);
