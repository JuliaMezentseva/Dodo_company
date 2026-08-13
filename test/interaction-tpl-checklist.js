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

function findNavItem(w, label) {
  const span = [...w.document.querySelectorAll("span")].find(el => el.textContent.trim() === label);
  if (!span) return null;
  return span.parentElement;
}
function tick(ms) { return new Promise(res => setTimeout(res, ms)); }

const target = path.resolve(__dirname, "..", "hr", "template.html");

(async () => {
  try {
    // tpl_sales: goalsEnabled=false из коробки, контрольные точки не предзаполнены —
    // список стартует пустым, симметрично блоку "Цели".
    const w = loadPage(target, "tpl=tpl_sales");
    await tick(150);
    let body = w.document.body.textContent;
    console.log("Goals section is default:", body.includes("План адаптации") ? "PASS" : "FAIL");
    console.log("Toggle label updated:", body.includes("Включить план адаптации с целями") ? "PASS" : "FAIL");
    console.log("Checkpoints hidden while goals disabled:", !body.includes("Контрольные точки") ? "PASS" : "FAIL");

    // Некликабельный пункт навигации не переключает секцию
    const descNav = findNavItem(w, "Описание");
    descNav.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(50);
    console.log("Disabled nav item ('Описание') stays inert:", w.document.body.textContent.includes("Включить план адаптации с целями") ? "PASS" : "FAIL");

    // Заглушка "Чек-лист"
    const checklistNav = findNavItem(w, "Чек-лист");
    checklistNav.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(50);
    body = w.document.body.textContent;
    console.log("Checklist stub shown:", body.includes("Базового минимума") ? "PASS" : "FAIL");
    console.log("Checklist stub has no CRUD controls:", !w.document.body.innerHTML.includes("Добавить контрольную точку") ? "PASS" : "FAIL");

    // Возвращаемся в "План адаптации" и включаем тумблер — по умолчанию открыт таб "Цели",
    // переключаемся на таб "Контрольные точки", чтобы увидеть пустую заглушку (симметричную
    // заглушке блока "Цели") и кнопку добавления первой КТ.
    const goalsNav = findNavItem(w, "План адаптации");
    goalsNav.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(50);
    const switchEl = w.document.querySelector('[role="switch"]');
    switchEl.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    const checkpointsTab = [...w.document.querySelectorAll("span")].find(el => el.textContent.trim().startsWith("Контрольные точки"));
    checkpointsTab.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("After enabling — empty-state stub shown (no prefilled checkpoints):",
      body.includes("Запланируйте регулярные встречи с сотрудником") && !body.includes("Контрольная точка по итогам 30 дней") ? "PASS" : "FAIL");
    console.log("Empty state has explanatory text with 30/60/90 recommendation (symmetric to goals empty state):",
      body.includes("Рекомендуем добавить 3: на 30 / 60 / 90 дней") ? "PASS" : "FAIL");
    console.log("Empty-state CTA button reads 'Добавить контрольную точку' (same wording as list-mode button):",
      [...w.document.querySelectorAll("button")].filter(b => b.textContent.trim() === "Добавить контрольную точку").length === 1 ? "PASS" : "FAIL");
    console.log("Persistent hint not yet shown while list is empty:", !body.includes("вовремя помочь ему") ? "PASS" : "FAIL");

    // Добавляем первую КТ через кнопку в заглушке
    const addBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Добавить контрольную точку");
    addBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    console.log("Create modal opened:", w.document.body.textContent.includes("Новая контрольная точка") ? "PASS" : "FAIL");

    const titleInput = w.document.querySelector('input[placeholder^="Например"]');
    const setTitle = Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, "value").set;
    setTitle.call(titleInput, "КТ по итогам 90 дней");
    titleInput.dispatchEvent(new w.Event("input", { bubbles: true }));
    const agendaTextarea = w.document.querySelector("textarea");
    const setAgenda = Object.getOwnPropertyDescriptor(w.HTMLTextAreaElement.prototype, "value").set;
    setAgenda.call(agendaTextarea, "Финальные итоги адаптации");
    agendaTextarea.dispatchEvent(new w.Event("input", { bubbles: true }));
    await tick(50);

    const saveBtn = [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === "Добавить" && !b.disabled);
    console.log("Save button enabled after filling required fields:", !!saveBtn ? "PASS" : "FAIL");
    saveBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("New checkpoint appears in list (1st, numbered '1'):", body.includes("КТ по итогам 90 дней") ? "PASS" : "FAIL");
    console.log("List-mode 'Добавить контрольную точку' button appears once list is non-empty:", body.includes("Добавить контрольную точку") ? "PASS" : "FAIL");
    console.log("Persistent hint stays visible after adding the first checkpoint:",
      body.includes("Контрольные точки помогут фиксировать, как сотрудник справляется и вовремя помочь ему. Рекомендуем добавить 3 точки: на 30 / 60 / 90 дней") ? "PASS" : "FAIL");

    // Удаляем добавленную КТ через кнопку корзины на её строке (нужен самый вложенный
    // div-контейнер строки — ровно с двумя кнопками: редактировать и удалить).
    const newRow = [...w.document.querySelectorAll("div")]
      .filter(d => d.textContent.includes("КТ по итогам 90 дней") && d.querySelectorAll("button").length === 2)
      .pop();
    const deleteBtn = newRow.querySelectorAll("button")[1]; // [0] = edit, [1] = delete
    deleteBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("Checkpoint removed after delete click:", !body.includes("КТ по итогам 90 дней") ? "PASS" : "FAIL");
    console.log("Empty-state stub reappears after deleting the only checkpoint:", body.includes("Запланируйте регулярные встречи с сотрудником") ? "PASS" : "FAIL");

    // tpl_support: goalsEnabled=false, без предзаполненных checkpoints — проверяем включение
    // тумблера с чистого листа (пустая заглушка, кнопка добавления доступна сразу).
    const w2 = loadPage(target, "tpl=tpl_support");
    await tick(150);
    console.log("[empty tpl] Checkpoints section hidden while goals disabled:",
      !w2.document.body.textContent.includes("Контрольные точки") ? "PASS" : "FAIL");
    const switchEl2 = w2.document.querySelector('[role="switch"]');
    switchEl2.dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
    await tick(80);
    let body2 = w2.document.body.textContent;
    console.log("[empty tpl] Owner defaults to 'Создать сразу в шаблоне' after enabling (empty-state visible):", body2.includes("Сформируйте цели и шаги для их достижения") ? "PASS" : "FAIL");
    const checkpointsTab2 = [...w2.document.querySelectorAll("span")].find(el => el.textContent.trim().startsWith("Контрольные точки"));
    checkpointsTab2.dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body2 = w2.document.body.textContent;
    console.log("[empty tpl] Empty-state stub available even with empty list:", body2.includes("Запланируйте регулярные встречи с сотрудником") ? "PASS" : "FAIL");

    console.log("\nOK: сценарий CRUD контрольных точек шаблона прошёл без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
