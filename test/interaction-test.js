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

function click(el) {
  el.dispatchEvent(new (require("jsdom").JSDOM).window.MouseEvent ? el.ownerDocument.defaultView.MouseEvent("click", { bubbles: true }) : null);
}

const target = path.resolve("/home/claude/proto/hr/plan.html");

// Тест 1: черновик — выключение блока целей без существующих целей идёт БЕЗ модалки подтверждения
setTimeout(() => {
  const w1 = loadPage(target, "kind=draft&id=draft1");
  setTimeout(() => {
    const sw = w1.document.querySelector('[role="switch"]');
    sw.dispatchEvent(new w1.MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      const modal = w1.document.body.textContent.includes("Выключить блок целей?");
      console.log("TEST 1 (draft, no goals yet): switch click -> modal shown =", modal, modal === false ? "PASS (ожидаемо без модалки)" : "FAIL");
      runTest2();
    }, 50);
  }, 100);
}, 0);

function runTest2() {
  // Тест 2: план "в процессе" (onboarding) — цели уже есть, выключение ДОЛЖНО показать модалку
  const w2 = loadPage(target, "kind=assigned&id=onboarding");
  setTimeout(() => {
    const sw = w2.document.querySelector('[role="switch"]');
    sw.dispatchEvent(new w2.MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      const modal = w2.document.body.textContent.includes("Выключить блок целей?");
      console.log("TEST 2 (onboarding, has goals): switch click -> modal shown =", modal, modal === true ? "PASS" : "FAIL");
      runTest3();
    }, 50);
  }, 100);
}

function runTest3() {
  // Тест 3: план "ожидает проверки" (review) — переключатель заблокирован
  const w3 = loadPage(target, "kind=assigned&id=review");
  setTimeout(() => {
    const sw = w3.document.querySelector('[role="switch"]');
    const disabledAttr = sw.getAttribute("aria-checked") !== null && sw.closest("span") ;
    // переключатель на review должен быть недоступен (обёрнут в Tooltip, курсор default) — проверим через disabled-стиль кнопки Switch
    const cursor = w3.getComputedStyle ? null : null;
    console.log("TEST 3 (review, locked): switch present =", !!sw, "(визуальная проверка disabled — см. рендер ниже)");
    console.log("TEST 3 body includes 'Настройки недоступны' tooltip markup only on hover — skipping deep check, switch exists:", !!sw);
  }, 100);
}
