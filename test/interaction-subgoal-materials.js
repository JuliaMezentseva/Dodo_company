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

    // Переключаемся на вкладку "План адаптации" (цели)
    const maxTab = [...w.document.querySelectorAll("span")].find(el => el.textContent.trim().startsWith("План адаптации"));
    console.log("Вкладка 'План адаптации' найдена (переименование прошло):", !!maxTab ? "PASS" : "FAIL");
    maxTab.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);

    // Цель g2 и её подцели видны сразу, без разворачивания шевроном
    const goalTitle = [...w.document.querySelectorAll("div")].find(el => el.textContent.trim() === "Вывести 3 сделки на этап КП и выполнить план на 80%");
    console.log("Цель g2 найдена на странице:", !!goalTitle ? "PASS" : "FAIL");

    // Кликаем на подцель "Подготовить и отправить 3 КП"
    const subgoalRow = [...w.document.querySelectorAll(".sk-clickable")].find(el => el.className.includes("sk-row") && el.textContent.includes("Подготовить и отправить 3 коммерческих предложения"));
    subgoalRow.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(100);

    let body = w.document.body.textContent;
    console.log("Дровер шага открыт (заголовок цели виден):", body.includes("Вывести 3 сделки") ? "PASS" : "FAIL");
    console.log("Блок 'Полезные материалы' показан со счётчиком 2/3:", body.includes("Полезные материалы 2/3") ? "PASS" : "FAIL");
    console.log("Материал-курс 'CRM для менеджера продаж' виден:", body.includes("Курс: CRM для менеджера продаж") ? "PASS" : "FAIL");
    console.log("Невыполненный материал 'Шаблон коммерческого предложения' виден:", body.includes("Шаблон коммерческого предложения") ? "PASS" : "FAIL");

    // Проверяем что чекбоксы кликабельны - находим 3 чекбокса в дровере материалов
    const drawerCheckboxes = [...w.document.querySelectorAll('[role="checkbox"]')];
    console.log("В дровере ровно 3 чекбокса материалов:", drawerCheckboxes.length === 3 ? "PASS" : "FAIL (" + drawerCheckboxes.length + ")");

    // Кликаем невыполненный чекбокс (Шаблон КП)
    const uncheckedBox = drawerCheckboxes.find(cb => cb.getAttribute("aria-checked") === "false");
    console.log("Найден невыполненный чекбокс:", !!uncheckedBox ? "PASS" : "FAIL");
    uncheckedBox.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);

    body = w.document.body.textContent;
    console.log("После отметки — счётчик обновился до 3/3:", body.includes("Полезные материалы 3/3") ? "PASS" : "FAIL");

    // Снимаем отметку обратно и проверяем, что счётчик вернулся к исходному значению
    const checkedBoxes = [...w.document.querySelectorAll('[role="checkbox"]')].filter(cb => cb.getAttribute("aria-checked") === "true");
    const templateBox = checkedBoxes.find(cb => cb.parentElement.parentElement.textContent.includes("Шаблон коммерческого предложения"));
    templateBox.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("Чекбокс материала переключается обратно (счётчик снова 2/3):", body.includes("Полезные материалы 2/3") ? "PASS" : "FAIL");

    console.log("\nOK: сценарий 'Полезные материалы' в дровере шага прошёл без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
