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
function setVal(w, el, val) {
  const proto = el.tagName === "TEXTAREA" ? w.HTMLTextAreaElement.prototype : w.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, val);
  el.dispatchEvent(new w.Event("input", { bubbles: true }));
}
function click(w, el) { el.dispatchEvent(new w.MouseEvent("click", { bubbles: true })); }
function findByText(w, sel, text) { return [...w.document.querySelectorAll(sel)].find(el => el.textContent.trim() === text); }
function topDialog(w) { const d = w.document.querySelectorAll('[role="dialog"]'); return d[d.length - 1]; }

const target = path.resolve(__dirname, "..", "hr", "template.html");

(async () => {
  try {
    const w = loadPage(target, "tpl=tpl_sales");
    await tick(150);

    // Включаем план адаптации
    const switchEl = w.document.querySelector('[role="switch"]');
    click(w, switchEl);
    await tick(80);
    let body = w.document.body.textContent;
    console.log("Header 'Настройка плана адаптации' present:", body.includes("Настройка плана адаптации") ? "PASS" : "FAIL");
    console.log("Two separate cards 'Цели' and 'Контрольные точки':", body.includes("Цели") && body.includes("Контрольные точки") ? "PASS" : "FAIL");
    console.log("No dev variant switcher (removed, only Variant A kept):", !body.includes("выберите вариант переключателя") ? "PASS" : "FAIL");
    console.log("No stray hint text about typical roles:", !body.includes("используется типовой процесс") ? "PASS" : "FAIL");
    console.log("No separate catalog button next to 'Создать цель':", !body.includes("Добавить из каталога") ? "PASS" : "FAIL");
    console.log("No checkpoint 'Обязательная' tag text ('required' label removed):", !body.includes("Обязательная") ? "PASS" : "FAIL");

    // Переключаем на "Создать сразу в шаблоне"
    const hrRadio = [...w.document.querySelectorAll("span,div")].find(el => el.textContent.trim() === "Создать сразу в шаблоне" && el.children.length === 0);
    console.log("Found 'Создать сразу в шаблоне' option:", !!hrRadio ? "PASS" : "FAIL");
    click(w, hrRadio);
    await tick(80);
    body = w.document.body.textContent;
    console.log("'Ожидают настройки' badge shown with 0 goals:", body.includes("Ожидают настройки") ? "PASS" : "FAIL");
    console.log("No old warning text about missing goals:", !body.includes("Добавьте хотя бы одну цель") ? "PASS" : "FAIL");

    const createBtn = findByText(w, "button", "Создать цель");
    console.log("'Создать цель' button is accent/primary styled:", createBtn && createBtn.style.background && createBtn.style.background !== "" ? "PASS" : "FAIL (empty inline bg — check manually)");
    click(w, createBtn);
    await tick(80);
    console.log("Method modal opened:", w.document.body.textContent.includes("Как добавить цель?") ? "PASS" : "FAIL");

    const manualTile = findByText(w, "div", "Вручную");
    click(w, manualTile);
    await tick(80);
    console.log("Goal create drawer opened:", w.document.body.textContent.includes("Создание цели адаптации") ? "PASS" : "FAIL");

    const titleInput = w.document.querySelector('input[placeholder^="Что сотрудник"]');
    setVal(w, titleInput, "Изучить продукт компании");
    await tick(50);
    const createGoalBtn = findByText(w, "button", "Создать");
    click(w, createGoalBtn);
    await tick(80);
    body = w.document.body.textContent;
    console.log("Goal added, no goals warning anymore:", !body.includes("Добавьте хотя бы одну цель") ? "PASS" : "FAIL");
    console.log("Goal row shows 'Шаги ещё не добавлены':", body.includes("Шаги ещё не добавлены") ? "PASS" : "FAIL");

    // Открываем цель, добавляем шаг
    const goalRow = findByText(w, "div", "Изучить продукт компании");
    click(w, goalRow.closest(".sk-clickable") || goalRow);
    await tick(80);
    body = w.document.body.textContent;
    console.log("Goal drawer opened (title 'Цель адаптации'):", body.includes("Цель адаптации") ? "PASS" : "FAIL");

    const addSubgoalBtn = findByText(w, "button", "+ Добавить");
    click(w, addSubgoalBtn);
    await tick(80);
    let dlg = topDialog(w);
    console.log("Subgoal form opened:", dlg.textContent.includes("Шаг для выполнения цели") ? "PASS" : "FAIL");
    console.log("Assessment section present ('Проверка выполнения шага'):", dlg.textContent.includes("Проверка выполнения шага") ? "PASS" : "FAIL");
    console.log("Materials picker is not disabled (real UI, not stub):", !dlg.textContent.includes("Скоро будет доступно") ? "PASS" : "FAIL");

    // Заполняем шаг и добавляем полезный материал (скоупим поиск полей внутри верхнего диалога,
    // т.к. дровер цели остаётся в DOM позади модалки шага)
    const stepTitleInput = dlg.querySelector('input[type="text"], input:not([type])');
    setVal(w, stepTitleInput, "Настроить доступы к CRM");
    await tick(50);
    const addMaterialBtn = [...dlg.querySelectorAll("button")].find(b => b.textContent.trim() === "Добавить");
    click(w, addMaterialBtn);
    await tick(80);
    dlg = topDialog(w);
    console.log("Material form modal opened:", dlg.textContent.includes("Полезный материал") ? "PASS" : "FAIL");
    const materialTitleInput = dlg.querySelector('input[type="text"], input:not([type])');
    setVal(w, materialTitleInput, "Регламент работы с CRM");
    await tick(50);
    const addMaterialConfirmBtn = [...dlg.querySelectorAll("button")].find(b => b.textContent.trim() === "Добавить" && !b.disabled);
    click(w, addMaterialConfirmBtn);
    await tick(80);
    dlg = topDialog(w);
    console.log("Material appears in step form list:", dlg.textContent.includes("Регламент работы с CRM") ? "PASS" : "FAIL");

    const saveStepBtn = [...dlg.querySelectorAll("button")].filter(b => b.textContent.trim() === "Добавить" && !b.disabled).pop();
    click(w, saveStepBtn);
    await tick(80);
    body = w.document.body.textContent;
    console.log("Step visible in goal drawer after save:", body.includes("Настроить доступы к CRM") ? "PASS" : "FAIL");
    console.log("Materials pill 'Полезные материалы: 1' shown for the step:", body.includes("Полезные материалы: 1") ? "PASS" : "FAIL");

    // Закрываем дровер цели (клик по оверлею вне диалога), проверяем что шаг и пилюля видны
    // прямо в списке целей на основной странице (пункт 6), а не только внутри дровера
    const overlay = w.document.querySelector('[role="dialog"]').parentElement;
    click(w, overlay);
    await tick(80);
    body = w.document.body.textContent;
    console.log("Step title visible directly in goals list (not just inside drawer):", body.includes("Настроить доступы к CRM") ? "PASS" : "FAIL");
    console.log("Materials pill visible directly in goals list:", body.includes("Полезные материалы: 1") ? "PASS" : "FAIL");

    // Левая колонка теперь объединяет разделы плана, информацию, статистику и кнопки действий
    console.log("Left column merges 'Разделы плана' + 'Информация' + 'Статистика':",
      body.includes("Разделы плана") && body.includes("Информация") && body.includes("Статистика") ? "PASS" : "FAIL");
    console.log("'Вернуться' button present in merged left column:", body.includes("Вернуться") ? "PASS" : "FAIL");

    // Только вариант A (SegmentedControl) для "Кто настраивает цели" — без bold
    const ownerLabel = [...w.document.querySelectorAll("span")].find(el => el.textContent.trim() === "Кто настраивает цели");
    console.log("'Кто настраивает цели' label present:", !!ownerLabel ? "PASS" : "FAIL");
    console.log("'Кто настраивает цели' label is not bold (sk-label-3-regular):", ownerLabel && ownerLabel.className.includes("sk-label-3-regular") ? "PASS" : "FAIL");

    console.log("\nOK: сценарий HR-цели прошёл без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }

  // Отдельная свежая загрузка со сценарием по умолчанию ("Создает руководитель"),
  // чтобы проверить лейбл срока постановки целей (виден только при owner === "manager").
  try {
    const w2 = loadPage(target, "tpl=tpl_sales");
    await tick(150);
    const switchEl2 = w2.document.querySelector('[role="switch"]');
    click(w2, switchEl2);
    await tick(80);
    const deadlineLabel = [...w2.document.querySelectorAll("span")].find(el => el.textContent.trim() === "Срок постановки целей руководителем после назначения плана (дней)");
    console.log("Deadline label present (manager scenario):", !!deadlineLabel ? "PASS" : "FAIL");
    console.log("Deadline label is not bold (sk-label-3-regular):", deadlineLabel && deadlineLabel.className.includes("sk-label-3-regular") ? "PASS" : "FAIL");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
