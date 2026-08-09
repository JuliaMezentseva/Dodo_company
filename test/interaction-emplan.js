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
function tick(ms) { return new Promise(res => setTimeout(res, ms)); }

const target = path.resolve(__dirname, "..", "employee", "plan.html");

(async () => {
  try {
    const w = loadPage(target, "plan=onboarding");
    await tick(150);

    // 0. Переключиться на вкладку "План адаптации" — цели теперь скрыты за сегмент-контролом
    const maxTab = [...w.document.querySelectorAll("span")].find(el => el.textContent.includes("План адаптации"));
    console.log("Found 'План адаптации' tab:", !!maxTab ? "PASS" : "FAIL");
    maxTab.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);

    // 1. Подцели цели g3 видны сразу без разворачивания (шеврон убран — список всегда развёрнут)
    const goalTitle = [...w.document.querySelectorAll("div")].find(el => el.textContent.trim() === "Освоить полный цикл продажи и закрывать сделки без наставника");
    console.log("Found goal g3 title:", !!goalTitle ? "PASS" : "FAIL");

    // 2. Открыть подцель "не начата" (g3s1) прямо со страницы (список виден без клика по цели) и взять в работу
    const notStartedRow = [...w.document.querySelectorAll(".sk-label-3-regular")].find(el => el.textContent.includes("Самостоятельно провести сделку от первого контакта"));
    console.log("Found not_started subgoal row:", !!notStartedRow ? "PASS" : "FAIL");
    notStartedRow.closest(".sk-clickable").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);

    const takeBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Взять в работу");
    console.log("'Взять в работу' button present:", !!takeBtn ? "PASS" : "FAIL");
    takeBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    console.log("Toast after taking subgoal:", w.document.body.textContent.includes("взята в работу") ? "PASS" : "FAIL");

    const submitBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Отправить на подтверждение");
    console.log("'Отправить на подтверждение' now available:", !!submitBtn ? "PASS" : "FAIL");
    submitBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    console.log("Toast after submit:", w.document.body.textContent.includes("Отправлено на подтверждение") ? "PASS" : "FAIL");

    // 3. Переключиться обратно на "Базовые действия" и отметить пункт чек-листа выполненным
    const minTab = [...w.document.querySelectorAll("span")].find(el => el.textContent.includes("Базовые действия"));
    minTab.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    const checkboxes = [...w.document.querySelectorAll('[role="checkbox"]')];
    console.log("Checklist checkboxes found (> 0):", checkboxes.length > 0 ? "PASS" : "FAIL (" + checkboxes.length + ")");
    const uncheckedBox = checkboxes.find(c => c.getAttribute("aria-checked") === "false");
    uncheckedBox.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(50);
    console.log("Checkbox toggled without crash:", "PASS");

    // 4. Клик по карточке цели (не по подцели) открывает дровер цели с деталями
    const maxTab2 = [...w.document.querySelectorAll("span")].find(el => el.textContent.includes("План адаптации"));
    maxTab2.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    const goalCardTitle = [...w.document.querySelectorAll(".sk-title-5")].find(el => el.textContent.trim() === "Освоить полный цикл продажи и закрывать сделки без наставника");
    console.log("Goal card title found on page:", !!goalCardTitle ? "PASS" : "FAIL");
    goalCardTitle.closest(".sk-clickable").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    console.log("Goal drawer opens on card click:", w.document.body.textContent.includes("Нужно самостоятельно провести хотя бы одну сделку") ? "PASS" : "FAIL");

    console.log("\nOK: сценарий плана сотрудника (взять/отправить подцель + чек-лист) прошёл без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
