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

function clickButtonContaining(window, text) {
  const els = Array.from(window.document.querySelectorAll("button, [role='button'], .sk-clickable"));
  const el = els.find(e => e.textContent.trim() === text || e.textContent.includes(text));
  if (!el) throw new Error("Button not found: " + text);
  el.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
  return el;
}

function tick(ms) { return new Promise(res => setTimeout(res, ms)); }

const target = path.resolve(__dirname, "..", "manager", "plan.html");

(async () => {
  try {
    const window = loadPage(target, "employee=yulia&tab=max");
    await tick(100);

    // 1) Открываем создание цели -> должна появиться модалка выбора способа, а не сразу дровер
    clickButtonContaining(window, "+ Создать");
    await tick(50);
    let body = window.document.body.textContent;
    console.log("Модалка 'Как создать цель?' показана:", body.includes("Как создать цель?"));
    console.log("Три способа видны (Вручную/каталог/AI-помощник):",
      body.includes("Вручную") && body.includes("Из каталога целей") && body.includes("С AI-помощником"));
    console.log("Приписка 'Скоро' убрана из плиток:", !body.includes("Скоро"));
    console.log("Дровер создания цели ЕЩЁ НЕ открыт:", !body.includes("Создание цели адаптации"));

    // 2) Кликаем "Вручную" -> должен открыться дровер создания цели
    clickButtonContaining(window, "Вручную");
    await tick(50);
    body = window.document.body.textContent;
    console.log("После клика 'Вручную' — дровер 'Создание цели адаптации' открыт:", body.includes("Создание цели адаптации"));
    console.log("Модалка выбора способа закрыта:", !body.includes("Как создать цель?"));

    // заполняем название, чтобы дойти до блока шагов
    let inputs = Array.from(window.document.querySelectorAll("input"));
    const proto = window.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
    setter.call(inputs[0], "Тестовая цель");
    inputs[0].dispatchEvent(new window.Event("input", { bubbles: true }));
    await tick(30);

    // 3) Кликаем "+ Добавить" (шаг) -> должна появиться модалка выбора способа шага
    clickButtonContaining(window, "+ Добавить");
    await tick(50);
    body = window.document.body.textContent;
    console.log("Модалка 'Как добавить шаг?' показана:", body.includes("Как добавить шаг?"));
    console.log("Два способа видны (Вручную/AI-помощник) без каталога:",
      body.includes("Вручную") && body.includes("С AI-помощником"));

    // 4) Кликаем "Вручную" в модалке шага -> должна открыться форма "Шаг для выполнения цели"
    clickButtonContaining(window, "Вручную");
    await tick(50);
    body = window.document.body.textContent;
    console.log("После клика 'Вручную' — форма 'Шаг для выполнения цели' открыта:", body.includes("Шаг для выполнения цели"));
    console.log("Модалка выбора способа шага закрыта:", !body.includes("Как добавить шаг?"));

    console.log("\nOK: сценарий прошёл без падений");
  } catch (e) {
    console.error("THREW:", e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
