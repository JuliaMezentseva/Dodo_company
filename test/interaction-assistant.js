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
const target = path.resolve(__dirname, "..", "assistant", "plan.html");
const w = loadPage(target, "employee=yulia2");
setTimeout(() => {
  // Переключиться на вкладку "План адаптации" — по умолчанию открыта "Базовые действия"
  const maxTab = [...w.document.querySelectorAll("span")].find(el => el.textContent.includes("План адаптации"));
  console.log("Found 'План адаптации' tab:", !!maxTab ? "PASS" : "FAIL");
  maxTab.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
setTimeout(() => {
  // Открыть подцель g2s3 "Проанализировать 3 компании из подборки" (reviewer = Дмитрий Волков, статус pending_review)
  const row = [...w.document.querySelectorAll(".sk-label-3-regular")].find(el => el.textContent.includes("Проанализировать 3 компании"));
  console.log("Subgoal row found:", !!row);
  row.closest(".sk-clickable").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  setTimeout(() => {
    const confirmBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Подтвердить");
    console.log("Assistant sees 'Подтвердить' button (is reviewer):", !!confirmBtn ? "PASS" : "FAIL");
    if (confirmBtn) confirmBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      console.log("Toast after confirm:", w.document.body.textContent.includes("подтверждена") ? "PASS" : "FAIL");

      // Открыть КТ "60 дней" (cp2, dateLabel "16 апреля", reviewer = Дмитрий Волков) через правую панель.
      // Опрос сотрудника ещё не пройден (surveySubmitted: false) — кнопка завершения должна быть
      // видна (assistant — назначенный reviewer), но disabled, пока сотрудник не ответит.
      const cpRow = [...w.document.querySelectorAll(".sk-label-4")].find(el => el.textContent.includes("16 апреля"));
      console.log("CP2 row found:", !!cpRow);
      cpRow.closest(".sk-clickable").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
      setTimeout(() => {
        const finishBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.includes("Завершить контрольную точку"));
        console.log("Assistant sees finish button as reviewer (disabled, survey not ready):", finishBtn && finishBtn.disabled ? "PASS" : "FAIL");
      }, 50);
    }, 50);
  }, 50);
}, 80);
}, 150);
