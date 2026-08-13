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
    console.log("Tabs live in their own bordered card, separate from the toggle card:",
      [...w.document.querySelectorAll("div")].filter(el => el.style && el.style.boxShadow && el.style.boxShadow.includes("inset 0 0 0 1px")).length >= 2 ? "PASS" : "FAIL");
    console.log("Tabs 'Цели' and 'Контрольные точки' both present:", body.includes("Цели") && body.includes("Контрольные точки") ? "PASS" : "FAIL");
    console.log("'Goals' tab is active by default (owner picker visible):", body.includes("Способ настройки целей") ? "PASS" : "FAIL");
    console.log("Checkpoints content hidden until its tab is clicked:", !body.includes("Добавить контрольную точку") ? "PASS" : "FAIL");

    // Кликаем по табу "Контрольные точки" и проверяем переключение содержимого
    const checkpointsTab = [...w.document.querySelectorAll("span")].find(el => el.textContent.trim().startsWith("Контрольные точки"));
    click(w, checkpointsTab);
    await tick(80);
    body = w.document.body.textContent;
    console.log("After clicking checkpoints tab — checkpoints content visible (empty state):", body.includes("Запланируйте регулярные встречи с сотрудником") ? "PASS" : "FAIL");
    console.log("After clicking checkpoints tab — goals content hidden:", !body.includes("Способ настройки целей") ? "PASS" : "FAIL");

    // Возвращаемся на таб "Цели" для продолжения сценария
    const goalsTab = [...w.document.querySelectorAll("span")].find(el => el.textContent.trim().startsWith("Цели"));
    click(w, goalsTab);
    await tick(80);
    body = w.document.body.textContent;

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
    console.log("Empty state shown with 0 goals ('Сформируйте цели и шаги...'):", body.includes("Сформируйте цели и шаги для их достижения") ? "PASS" : "FAIL");
    console.log("No old warning text about missing goals:", !body.includes("Добавьте хотя бы одну цель") ? "PASS" : "FAIL");
    console.log("No 'Ожидают настройки' badge (replaced by empty state):", !body.includes("Ожидают настройки") ? "PASS" : "FAIL");

    const createBtn = findByText(w, "button", "+ Создать");
    console.log("'+ Создать' empty-state button found:", !!createBtn ? "PASS" : "FAIL");
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
    console.log("Goal row shows condensed due date (icon + 'до <день> <месяц>'):", /до \d+ (января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)/.test(body) ? "PASS" : "FAIL");
    console.log("No duplicated 'Цели' section heading (tab label is the only heading now):",
      [...w.document.querySelectorAll("span.sk-title-5")].filter(el => el.textContent.trim() === "Цели").length === 0 ? "PASS" : "FAIL");

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

    // Заполняем шаг и добавляем полезный материал через модалку выбора (та же форма, что у
    // руководителя: поиск + список с чекбоксами, а не свободный ввод)
    const stepTitleInput = dlg.querySelector('input[type="text"], input:not([type])');
    setVal(w, stepTitleInput, "Настроить доступы к CRM");
    await tick(50);
    const addMaterialBtn = [...dlg.querySelectorAll("button")].find(b => b.textContent.trim() === "Добавить");
    click(w, addMaterialBtn);
    await tick(80);
    dlg = topDialog(w);
    console.log("Material picker modal opened (title 'Полезные материалы'):", dlg.textContent.includes("Полезные материалы") ? "PASS" : "FAIL");
    console.log("Search input present in material picker:", !!dlg.querySelector('input[placeholder="Поиск по названию"]') ? "PASS" : "FAIL");
    console.log("Catalog items with checkboxes rendered:", dlg.querySelectorAll('[role="checkbox"], input[type="checkbox"]').length > 0 || dlg.textContent.includes("Регламент оформления сделки") ? "PASS" : "FAIL");

    const firstCatalogRow = [...dlg.querySelectorAll(".sk-clickable")].find(el => el.textContent.includes("Регламент оформления сделки в CRM"));
    click(w, firstCatalogRow);
    await tick(50);
    const doneBtn = [...dlg.querySelectorAll("button")].find(b => b.textContent.trim() === "Готово");
    click(w, doneBtn);
    await tick(80);
    dlg = topDialog(w);
    console.log("Material appears in step form list:", dlg.textContent.includes("Регламент оформления сделки в CRM") ? "PASS" : "FAIL");

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

    // Проверяем облегчённую вёрстку строки шага: фон без собственной рамки (border),
    // чтобы не создавать третий вложенный контур внутри карточки цели.
    const subgoalRow = [...w.document.querySelectorAll("div")].find(el =>
      el.textContent.includes("Настроить доступы к CRM") && el.textContent.includes("Полезные материалы: 1") && el.querySelector("span"));
    console.log("Subgoal row has no own border (flat background only, no nested frame):",
      subgoalRow && (!subgoalRow.style.border || subgoalRow.style.border === "") ? "PASS" : "FAIL");

    // Левая колонка содержит только разделы плана + кнопки действий — блоки "Информация"
    // и "Статистика" убраны из UI совсем (не просто свёрнуты)
    console.log("Left column shows 'Разделы плана':", body.includes("Разделы плана") ? "PASS" : "FAIL");
    console.log("'Информация' block removed entirely:", !body.includes("Информация") ? "PASS" : "FAIL");
    console.log("'Статистика' block removed entirely:", !body.includes("Статистика") ? "PASS" : "FAIL");
    console.log("'Вернуться' button present in left column:", body.includes("Вернуться") ? "PASS" : "FAIL");

    // Только вариант A (SegmentedControl) для "Способ настройки целей" — подпись выделена
    // жирным и отделена нижней границей, чтобы читаться как "шаг 1" настройки, а не рядовое поле
    const ownerLabel = [...w.document.querySelectorAll("span")].find(el => el.textContent.trim() === "Способ настройки целей");
    console.log("'Способ настройки целей' label present:", !!ownerLabel ? "PASS" : "FAIL");
    console.log("'Способ настройки целей' label is bold (sk-label-3, stands out as step 1):", ownerLabel && ownerLabel.className.includes("sk-label-3") && !ownerLabel.className.includes("sk-label-3-regular") ? "PASS" : "FAIL");
    console.log("Owner picker block has bottom separator (visually distinct step):",
      ownerLabel && ownerLabel.parentElement && ownerLabel.parentElement.style.borderBottom ? "PASS" : "FAIL");

    console.log("\nOK: сценарий HR-цели прошёл без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }

  // Отдельная свежая загрузка — включаем тумблер (по умолчанию открывается "Создать сразу
  // в шаблоне"), затем явно переключаемся на "Создает руководитель", чтобы проверить лейбл
  // срока постановки целей (виден только при owner === "manager").
  try {
    const w2 = loadPage(target, "tpl=tpl_sales");
    await tick(150);
    const switchEl2 = w2.document.querySelector('[role="switch"]');
    click(w2, switchEl2);
    await tick(80);
    let body2 = w2.document.body.textContent;
    console.log("Owner defaults to 'Создать сразу в шаблоне' right after enabling the toggle:",
      body2.includes("Сформируйте цели и шаги для их достижения") ? "PASS" : "FAIL");

    const managerOption = [...w2.document.querySelectorAll("span")].find(el => el.textContent.trim() === "Создает руководитель");
    click(w2, managerOption);
    await tick(80);
    const deadlineLabel = [...w2.document.querySelectorAll("span")].find(el => el.textContent.trim() === "Срок постановки целей руководителем после назначения плана (дней)");
    console.log("Deadline label present (manager scenario):", !!deadlineLabel ? "PASS" : "FAIL");
    console.log("Deadline label is not bold (sk-label-3-regular):", deadlineLabel && deadlineLabel.className.includes("sk-label-3-regular") ? "PASS" : "FAIL");
    body2 = w2.document.body.textContent;
    console.log("'В первой версии цели не создаются...' hint removed:", !body2.includes("В первой версии цели не создаются") ? "PASS" : "FAIL");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
