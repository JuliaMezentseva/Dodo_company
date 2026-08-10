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
const target = path.resolve(__dirname, "..", "employee", "plan.html");
const w = loadPage(target, "plan=onboarding");
setTimeout(() => {
  // Переключиться на вкладку "План адаптации" — блок КТ виден только на ней (showCheckpoints={tab === "max"})
  const maxTab = [...w.document.querySelectorAll("span")].find((el) => el.textContent.includes("План адаптации"));
  console.log("Found 'План адаптации' tab:", !!maxTab ? "PASS" : "FAIL");
  maxTab.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
setTimeout(() => {
  // Открыть контрольную точку cp1 (dateLabel "31 марта", pending, первая незавершённая — значит текущая и кликабельная)
  const cpRow = [...w.document.querySelectorAll(".sk-label-4")].find(el => el.textContent.includes("31 марта"));
  console.log("CP1 row found:", !!cpRow);
  cpRow.closest(".sk-clickable").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  setTimeout(() => {
    console.log("Drawer opened with survey:", w.document.body.textContent.includes("Опрос") ? "PASS" : "FAIL");
    // Шкальные вопросы рендерятся как круглые 38x38 кнопки с SVG ScaleFace внутри (без текста/эмодзи) — ищем по размеру
    const scaleButtons = [...w.document.querySelectorAll("button")].filter(b => b.style.width === "38px" && b.querySelector("svg"));
    console.log("Scale buttons found:", scaleButtons.length);
    // кликаем по 4-й кнопке (индекс 3) в каждой группе из 5 - для первых двух вопросов
    for (let i = 0; i < 5; i++) scaleButtons[i].dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    for (let i = 5; i < 10; i++) scaleButtons[i].dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      const textarea = w.document.querySelector("textarea");
      const setter = Object.getOwnPropertyDescriptor(w.HTMLTextAreaElement.prototype, "value").set;
      setter.call(textarea, "Тестовый ответ на открытый вопрос");
      textarea.dispatchEvent(new w.Event("input", { bubbles: true }));
      setTimeout(() => {
        const submitBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Отправить ответы");
        console.log("Submit button enabled:", submitBtn && !submitBtn.disabled ? "PASS" : "FAIL (disabled=" + (submitBtn && submitBtn.disabled) + ")");
        submitBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
        setTimeout(() => {
          console.log("Toast after survey submit:", w.document.body.textContent.includes("Ответы отправлены") ? "PASS" : "FAIL");
        }, 50);
      }, 30);
    }, 30);
  }, 50);
}, 80);
}, 150);
