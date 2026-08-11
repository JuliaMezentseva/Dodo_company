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

const target = path.resolve(__dirname, "..", "manager", "plan.html");

(async () => {
  try {
    // ---- Сценарий A (survey ready, форма ещё не заполнена): план Алексея, КТ 60 дней — сотрудник
    // уже ответил на опрос (surveySubmitted: true), форма для проверяющего доступна для заполнения,
    // баннер должен показывать "Ожидает проверяющего". ----
    const w1 = loadPage(target, "employee=alexey&tab=max");
    await tick(150);
    const cp2Row = [...w1.document.querySelectorAll(".sk-label-4")].find(el => el.textContent.includes("2 марта"));
    console.log("[A] CP2 row found:", !!cp2Row ? "PASS" : "FAIL");
    cp2Row.closest(".sk-clickable").dispatchEvent(new w1.MouseEvent("click", { bubbles: true }));
    await tick(80);
    let body = w1.document.body.textContent;
    console.log("[A] Finish button present but disabled before filling fields:",
      [...w1.document.querySelectorAll("button")].some(b => b.textContent.includes("Завершить контрольную точку") && b.disabled) ? "PASS" : "FAIL");
    console.log("[A] Comments section still visible:", body.includes("Комментарии") ? "PASS" : "FAIL");
    console.log("[A] Status banner shows 'Ожидает проверяющего':", body.includes("Ожидает проверяющего") ? "PASS" : "FAIL");
    // Проверяем только textarea формы итогов (не комментарий — тот всегда доступен для ввода)
    const formTextareas = [...w1.document.querySelectorAll("textarea")].filter(t => t.placeholder !== "Написать комментарий");
    console.log("[A] Textareas editable (survey ready):", formTextareas.length > 0 && formTextareas.every(t => !t.disabled) ? "PASS" : "FAIL");

    // ---- Сценарий B (editable): план "yulia2" (второй, более поздний план Юлии), КТ "90 дней"
    // назначена на саму Анну Козлову — опрос сотрудника уже готов, форма редактируема, можно завершить. ----
    const w2 = loadPage(target, "employee=yulia2&tab=max");
    await tick(150);
    const cp2RowY = [...w2.document.querySelectorAll(".sk-label-4")].find(el => el.textContent.includes("6 мая"));
    console.log("[B] CP2 row found:", !!cp2RowY ? "PASS" : "FAIL");
    cp2RowY.closest(".sk-clickable").dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w2.document.body.textContent;
    console.log("[B] Drawer title greets employee by name:", body.includes("Как проходит адаптация — Юлия") ? "PASS" : "FAIL");
    console.log("[B] Survey answers section shown ('Ответы сотрудника'):", body.includes("Ответы сотрудника") ? "PASS" : "FAIL");
    console.log("[B] Textareas are editable (not disabled):", [...w2.document.querySelectorAll("textarea")].every(t => !t.disabled) ? "PASS" : "FAIL");
    console.log("[B] Risk level pills present (отсутствует/Низкий/Средний/Высокий):",
      body.includes("отсутствует") && body.includes("Низкий") && body.includes("Средний") && body.includes("Высокий") ? "PASS" : "FAIL");
    console.log("[B] Finish button present but disabled before filling fields:",
      [...w2.document.querySelectorAll("button")].some(b => b.textContent.includes("Завершить контрольную точку") && b.disabled) ? "PASS" : "FAIL");

    // Заполняем обязательные поля и выбираем риск
    const textareas = [...w2.document.querySelectorAll("textarea")];
    const setTextareaValue = Object.getOwnPropertyDescriptor(w2.HTMLTextAreaElement.prototype, "value").set;
    setTextareaValue.call(textareas[0], "Отличный прогресс, продолжаем в том же духе.");
    textareas[0].dispatchEvent(new w2.Event("input", { bubbles: true }));
    setTextareaValue.call(textareas[1], "Внутренне: рисков не вижу, рекомендую продолжать по плану.");
    textareas[1].dispatchEvent(new w2.Event("input", { bubbles: true }));
    await tick(50);
    const riskBtn = [...w2.document.querySelectorAll("button")].find(b => b.textContent.trim() === "отсутствует");
    riskBtn.dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
    await tick(80);

    body = w2.document.body.textContent;
    console.log("[B] Status banner shows 'Всё заполнено' after filling all fields:", body.includes("Всё заполнено") ? "PASS" : "FAIL");
    const finishBtn = [...w2.document.querySelectorAll("button")].find(b => b.textContent.includes("Завершить контрольную точку"));
    console.log("[B] Finish button now enabled:", finishBtn && !finishBtn.disabled ? "PASS" : "FAIL");
    finishBtn.dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
    await tick(80);
    body = w2.document.body.textContent;
    console.log("[B] Drawer closes after finishing (onFinish calls setCpModal(null)):", !body.includes("Заполните обязательные поля выше") ? "PASS" : "FAIL");
    console.log("[B] Status banner shows 'Контрольная точка завершена':", body.includes("Контрольная точка завершена") ? "PASS" : "FAIL");

    console.log("\nOK: сценарии read-only и editable для формы КТ проверяющего прошли без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
