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
function click(el, w) { el.dispatchEvent(new w.MouseEvent("click", { bubbles: true, cancelable: true, view: w })); }
function findButtonByText(w, text) {
  return [...w.document.querySelectorAll("button")].find(b => b.textContent.trim() === text);
}
function findAllButtonsByText(w, text) {
  return [...w.document.querySelectorAll("button")].filter(b => b.textContent.trim() === text);
}

const target = path.resolve(__dirname, "..", "manager", "plan.html");
let failures = 0;
function check(label, ok) {
  console.log(`${ok ? "PASS" : "FAIL"} — ${label}`);
  if (!ok) failures++;
}

(async () => {
  try {
    // ================= Сценарий 1: форма добавления шага (draft-контекст, план Юлии — цели ещё не созданы) =================
    const w1 = loadPage(target, "employee=yulia&tab=max");
    await tick(200);

    const createGoalBtn = findButtonByText(w1, "+ Создать цель") || findButtonByText(w1, "+ Создать");
    check("[1] кнопка создания цели найдена", !!createGoalBtn);
    click(createGoalBtn, w1);
    await tick(120);

    const manualTiles = [...w1.document.querySelectorAll(".sk-clickable")].filter(el => el.textContent.includes("Вручную"));
    click(manualTiles[0], w1);
    await tick(120);
    check("[1] дровер создания цели открыт", w1.document.body.textContent.includes("Создание цели"));

    const addSubgoalBtn = findButtonByText(w1, "+ Добавить");
    check("[1] кнопка «+ Добавить» (шаг) в дровере цели найдена", !!addSubgoalBtn);
    click(addSubgoalBtn, w1);
    await tick(120);

    const subManualTiles = [...w1.document.querySelectorAll(".sk-clickable")].filter(el => el.textContent.includes("Вручную"));
    click(subManualTiles[0], w1);
    await tick(120);
    check("[1] модалка «Шаг для выполнения цели» открыта", w1.document.body.textContent.includes("Шаг для выполнения цели"));

    // 1a. Описание шага показывается сразу как Textarea (без кнопки «Добавить описание»), меньшего размера
    const addDescBtn = findButtonByText(w1, "Добавить описание");
    check("[1a] кнопка «Добавить описание» больше не используется (описание видно сразу)", !addDescBtn);
    const descTextarea = [...w1.document.querySelectorAll("textarea")].find(t => (t.getAttribute("rows") || "") === "2");
    check("[1a] textarea «Описание» отображается сразу, меньшего размера (rows=2)", !!descTextarea);

    // 1b. Полезные материалы прямо из формы — открытие пикера и выбор материала
    check("[1b] блок «Полезные материалы» есть в форме шага", w1.document.body.textContent.includes("Полезные материалы"));
    const addBtnsInStepForm = findAllButtonsByText(w1, "Добавить"); // [материалы, футер-модалки]
    check("[1b] найдена кнопка «Добавить» для материалов (первая из двух)", addBtnsInStepForm.length >= 1);
    click(addBtnsInStepForm[0], w1);
    await tick(150);
    const dialogs1 = [...w1.document.querySelectorAll('[role="dialog"]')];
    const pickerDialog = dialogs1.find(d => /Добро пожаловать|Получить доступы|Статья ·/.test(d.textContent));
    check("[1b] пикер материалов открылся (список элементов чек-листа виден)", !!pickerDialog);
    if (pickerDialog) {
      const firstRow = pickerDialog.querySelector(".sk-clickable");
      if (firstRow) { click(firstRow, w1); await tick(80); }
      const doneBtn = findButtonByText(w1, "Готово");
      if (doneBtn) { click(doneBtn, w1); await tick(100); }
    }
    check("[1b] выбранный материал отображается в форме шага", /Этап «/.test(w1.document.body.textContent));

    // 1c. Оценочный лист — чекбокс «Добавить оценочный лист» (вариант B); заголовок секции чёрным, оранжевая подсказка
    check("[1c] заголовок секции «Проверка выполнения шага» присутствует", w1.document.body.textContent.includes("Проверка выполнения шага"));
    check("[1c] текст «Добавить оценочный лист» присутствует", w1.document.body.textContent.includes("Добавить оценочный лист"));
    check("[1c] подсказка про итог без листа видна изначально (без привязки к роли)",
      w1.document.body.textContent.includes("итог выставляется на усмотрение проверяющего") && !/руководител/i.test(w1.document.body.textContent.split("итог выставляется на усмотрение проверяющего")[0].slice(-80)));
    const assessRow = [...w1.document.querySelectorAll(".sk-clickable")].find(el => el.textContent.includes("Добавить оценочный лист"));
    check("[1c] строка чекбокса оценочного листа найдена", !!assessRow);
    click(assessRow, w1);
    await tick(120);
    check("[1c] после клика появился select с готовыми листами", w1.document.body.textContent.includes("Первая консультация покупателя"));

    // ================= Сценарий 2: дровер шага С оценочным листом (Алексей, alg1s2 — pending_review) =================
    const w2 = loadPage(target, "employee=alexey&tab=max");
    await tick(200);
    const stepRows = [...w2.document.querySelectorAll(".sk-row.sk-clickable, .sk-clickable")]
      .filter(el => el.textContent.includes("Провести первую консультацию покупателя") && el.className.includes("sk-row"));
    const stepRow = stepRows[stepRows.length - 1]; // самая внутренняя строка подцели, не карточка цели
    check("[2] строка шага с pending_review найдена", !!stepRow);
    click(stepRow, w2);
    await tick(150);

    check("[2] заголовок «Оцените результаты» отображается", w2.document.body.textContent.includes("Оцените результаты"));
    check("[2] старый текст «Цель на проверке» отсутствует", !w2.document.body.textContent.includes("Цель на проверке"));
    check("[2] файл-вложение сотрудника в комментарии виден", w2.document.body.textContent.includes("Отчёт по консультации.pdf"));

    const evalBtn = findButtonByText(w2, "Оценить");
    check("[2] кнопка «Оценить» найдена", !!evalBtn);
    click(evalBtn, w2);
    await tick(150);

    const doneBtn = findButtonByText(w2, "Подтвердить выполнение шага");
    const workBtn = findButtonByText(w2, "На доработку");
    const notDoneBtn = findButtonByText(w2, "Шаг не выполнен");
    check("[2] кнопка «Подтвердить выполнение шага» найдена", !!doneBtn);
    check("[2] кнопка «На доработку» найдена", !!workBtn);
    check("[2] кнопка «Шаг не выполнен» найдена", !!notDoneBtn);
    check("[2] кнопки решения доступны сразу, БЕЗ блокировки по критериям (пункт 4)", !doneBtn.disabled && !notDoneBtn.disabled);

    click(doneBtn, w2);
    await tick(150);

    check("[2] появился экран защиты от дурака (текст «нельзя»)", w2.document.body.textContent.includes("нельзя"));
    const confirmBtn = findButtonByText(w2, "Да");
    check("[2] кнопка финального подтверждения «Да» найдена", !!confirmBtn);
    check("[2] есть возможность отменить решение", !!findButtonByText(w2, "Отменить"));

    click(confirmBtn, w2);
    await tick(150);
    check("[2] после подтверждения дровер закрылся (решение применено)", !w2.document.body.textContent.includes("Оценочный лист: первая консультация"));

    // ================= Сценарий 3: цвета кнопок в AssessmentModal заданы явно (не прозрачный tertiary) =================
    const w3 = loadPage(target, "employee=alexey&tab=max");
    await tick(150);
    const stepRows3 = [...w3.document.querySelectorAll(".sk-clickable")]
      .filter(el => el.textContent.includes("Провести первую консультацию покупателя") && el.className.includes("sk-row"));
    click(stepRows3[stepRows3.length - 1], w3);
    await tick(120);
    click(findButtonByText(w3, "Оценить"), w3);
    await tick(120);
    const notDoneBtn3 = findButtonByText(w3, "Шаг не выполнен");
    check("[3] кнопка «Шаг не выполнен» не использует прозрачный tertiary-фон", notDoneBtn3 && !/transparent/.test(notDoneBtn3.getAttribute("style") || ""));

    // ================= Сценарий 4: рендер остальных планов без ошибок (общая регрессия) =================
    for (const emp of ["darya", "yulia2"]) {
      const w = loadPage(target, `employee=${emp}&tab=max`);
      await tick(150);
      const rootLen = w.document.getElementById("root").children.length;
      check(`[4] план «${emp}» рендерится без ошибок`, rootLen > 0);
    }

    console.log(`\n${failures === 0 ? "ALL PASS" : failures + " FAILURE(S)"}`);
    process.exit(failures === 0 ? 0 : 1);
  } catch (e) {
    console.error("FATAL:", e);
    process.exit(1);
  }
})();
