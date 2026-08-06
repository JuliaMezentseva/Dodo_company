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
const target = path.resolve("/home/claude/proto/hr/plan-detail.html");
const w = loadPage(target, "id=ap_darya");
setTimeout(() => {
  console.log("Tab order (first tab must be 'Мои задачи'):", w.document.body.textContent.includes("Мои задачи") ? "PASS" : "FAIL");
  const idxTasks = w.document.body.textContent.indexOf("Мои задачи");
  const idxPlan = w.document.body.textContent.indexOf("План адаптации");
  console.log("'Мои задачи' appears before 'План адаптации':", idxTasks < idxPlan && idxTasks !== -1 ? "PASS" : "FAIL");
  console.log("Default status is 'В процессе' (2/3 done, not all):", w.document.body.textContent.includes("В процессе") ? "PASS" : "FAIL");

  // клик по чекбоксу третьей (незавершённой) задачи -> должно стать "Завершено"
  const checkboxes = [...w.document.querySelectorAll('[role="checkbox"], input[type="checkbox"]')];
  console.log("Checkboxes found in task list:", checkboxes.length);
  const lastTaskCheckbox = checkboxes[checkboxes.length - 1];
  lastTaskCheckbox.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  setTimeout(() => {
    console.log("After completing last required task, status 'Завершено':", w.document.body.textContent.includes("Завершено") ? "PASS" : "FAIL");

    // переключение на таб "План адаптации"
    const planTabEl = [...w.document.querySelectorAll("span")].find(el => el.textContent.trim() === "План адаптации");
    planTabEl.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      console.log("Plan tab shows checklist heading:", w.document.body.textContent.includes("Чек-лист") ? "PASS" : "FAIL");
    }, 50);
  }, 50);
}, 150);
