const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const babel = require("@babel/core");

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
  window.React = require("react");
  window.ReactDOM = require("react-dom/client");
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
function openSelectByLabel(w, labelText) {
  const labelSpan = Array.from(w.document.querySelectorAll("span")).find(el => el.textContent.trim() === labelText);
  const btn = labelSpan.parentElement.querySelector("button");
  btn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
}

const target = path.resolve(__dirname, "..", "employee", "vacancies.html");

(async () => {
  try {
    const w = loadPage(target);
    await tick(150);

    let body = w.document.body.textContent;
    console.log("Заголовок 'Вакансии' показан:", body.includes("Вакансии") ? "PASS" : "FAIL");

    // Панель фильтров с серым фоном справа присутствует
    console.log("Панель 'Фильтры' показана:", body.includes("Фильтры") ? "PASS" : "FAIL");
    console.log("Все 5 полей фильтра показаны (Подразделение/Опыт/Регион/Формат работы/Тип занятости):",
      body.includes("Подразделение") && body.includes("Опыт") && body.includes("Регион") &&
      body.includes("Формат работы") && body.includes("Тип занятости") ? "PASS" : "FAIL");
    console.log("Чекбокс 'Показать закрытые вакансии' показан:", body.includes("Показать закрытые вакансии") ? "PASS" : "FAIL");

    // По умолчанию закрытые вакансии скрыты (чекбокс выключен)
    console.log("Открытые вакансии видны по умолчанию (v1 'Специалист поддержки клиентов'):", body.includes("Специалист поддержки клиентов") ? "PASS" : "FAIL");
    console.log("Закрытая вакансия (v9) НЕ видна по умолчанию:", !body.includes("Специалист по кадровому администрированию") ? "PASS" : "FAIL");

    // Неопубликованная HR-вакансия (visibleToEmployees: false) не должна попадать в список вовсе
    console.log("Неопубликованная вакансия (v_hr1, Стажёр) НЕ видна сотруднику:", !body.includes("Стажёр отдела внутренних коммуникаций") ? "PASS" : "FAIL");

    // Отметка "Уже откликнулись" — есть отклик на v3 (Продуктовый аналитик) по данным myResponses
    console.log("Отметка 'Уже откликнулись' на вакансии с уже отправленным откликом:", /Продуктовый аналитик[\s\S]{0,400}Уже откликнулись/.test(body) || /Уже откликнулись[\s\S]{0,400}Продуктовый аналитик/.test(body) ? "PASS" : "FAIL");

    // Включаем чекбокс "Показать закрытые вакансии"
    const showClosedCb = Array.from(w.document.querySelectorAll('[role="checkbox"]'))
      .find(cb => cb.textContent.includes("Показать закрытые вакансии"));
    showClosedCb.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("После включения чекбокса — закрытая вакансия появилась:", body.includes("Специалист по кадровому администрированию") ? "PASS" : "FAIL");
    console.log("После включения чекбокса — открытые вакансии по-прежнему видны:", body.includes("Специалист поддержки клиентов") ? "PASS" : "FAIL");
    showClosedCb.dispatchEvent(new w.MouseEvent("click", { bubbles: true })); // выключаем обратно
    await tick(80);

    // Фильтр по направлению (пилюли)
    const itDirectionPill = Array.from(w.document.querySelectorAll("button")).find(b => b.textContent.includes("IT и цифровой бизнес"));
    itDirectionPill.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("После фильтра по направлению IT — видна вакансия Frontend-разработчик:", body.includes("Frontend-разработчик") ? "PASS" : "FAIL");
    console.log("После фильтра по направлению IT — не видна вакансия другого направления (Руководитель отдела продаж):", !body.includes("Руководитель отдела продаж") ? "PASS" : "FAIL");
    itDirectionPill.dispatchEvent(new w.MouseEvent("click", { bubbles: true })); // снимаем фильтр направления
    await tick(50);

    // Фильтр по региону (боковая панель, Select multiple)
    openSelectByLabel(w, "Регион");
    await tick(50);
    const spbOption = Array.from(w.document.querySelectorAll("li, [role='option'], div")).find(el => el.textContent.trim() === "Санкт-Петербург");
    spbOption.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("После фильтра по региону 'Санкт-Петербург' — видна вакансия оттуда:", body.includes("Специалист поддержки клиентов") ? "PASS" : "FAIL");
    console.log("После фильтра по региону 'Санкт-Петербург' — не видна московская вакансия:", !body.includes("Руководитель отдела продаж") ? "PASS" : "FAIL");
    console.log("Кнопка 'Сбросить' появилась при активном фильтре:", body.includes("Сбросить") ? "PASS" : "FAIL");

    // Сброс фильтров
    const resetBtn = Array.from(w.document.querySelectorAll("button")).find(b => b.textContent.trim() === "Сбросить");
    resetBtn.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("После сброса — московская вакансия снова видна:", body.includes("Руководитель отдела продаж") ? "PASS" : "FAIL");

    // Поиск
    const input = w.document.querySelector('input[placeholder^="Поиск"]');
    const setter = Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, "value").set;
    setter.call(input, "маркетолог");
    input.dispatchEvent(new w.Event("input", { bubbles: true }));
    await tick(80);
    body = w.document.body.textContent;
    console.log("Поиск по названию находит 'Маркетолог продукта':", body.includes("Маркетолог продукта") ? "PASS" : "FAIL");
    console.log("Поиск по названию не показывает нерелевантные вакансии:", !body.includes("Frontend-разработчик") ? "PASS" : "FAIL");

    // Ссылка на карточку вакансии ведёт на vacancy.html?id=...
    const cardLink = w.document.querySelector('a[href^="vacancy.html?id="]');
    console.log("Карточка вакансии — ссылка на vacancy.html с id:", cardLink ? "PASS" : "FAIL");

    console.log("\nOK: сценарий витрины вакансий сотрудника прошёл без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
