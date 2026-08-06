// Прогоняет HTML-страницу прототипа через jsdom: парсит <script type="text/babel">,
// транспилирует Babel'ом, исполняет в jsdom-окружении с реальными ds_bundle/data/shell,
// рендерит через ReactDOM и проверяет, что #root не пустой и не было JS-ошибок.
// Использование: node test/render-check.js hr/template.html [--query "plan=tpl1"]

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const babel = require("@babel/core");

const target = process.argv[2];
const queryArg = process.argv.find((a, i) => process.argv[i - 1] === "--query") || "";

if (!target) {
  console.error("Usage: node test/render-check.js <path-to-html> [--query \"a=b\"]");
  process.exit(1);
}

const ROOT = path.resolve(__dirname, "..");
const htmlPath = path.resolve(ROOT, target);
const htmlDir = path.dirname(htmlPath);
const html = fs.readFileSync(htmlPath, "utf8");

// Собираем список подключаемых скриптов в порядке появления: обычные <script src=...>
// (ds_bundle.js, data.js) исполняем как есть; <script type="text/babel" src=...> (shell.js)
// и инлайновый <script type="text/babel"> транспилируем через Babel (preset-react).
const scriptRe = /<script([^>]*)>([\s\S]*?)<\/script>/g;
let m;
const scripts = [];
while ((m = scriptRe.exec(html))) {
  const attrs = m[1];
  const body = m[2];
  const isBabel = /type="text\/babel"/.test(attrs);
  const srcMatch = attrs.match(/src="([^"]+)"/);
  if (srcMatch && /unpkg\.com/.test(srcMatch[1])) continue; // React/ReactDOM/Babel CDN — подставим локально
  scripts.push({ isBabel, src: srcMatch ? srcMatch[1] : null, body });
}

const url = "file://" + htmlPath + (queryArg ? "?" + queryArg : "");
const dom = new JSDOM(`<!doctype html><html><body><div id="root"></div></body></html>`, {
  url,
  runScripts: "outside-only",
  pretendToBeVisual: true,
});
const { window } = dom;

// react-dom обращается к глобальному `window`/`document`, а не только к переданным
// аргументам — поэтому регистрируем jsdom-окружение в global до require('react-dom').
global.window = window;
global.document = window.document;
global.navigator = window.navigator;
global.HTMLElement = window.HTMLElement;
global.requestAnimationFrame = window.requestAnimationFrame || ((cb) => setTimeout(cb, 0));
global.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

// Полифиллы/заглушки, которых нет в jsdom
window.React = require("react");
window.ReactDOM = require("react-dom/client");
window.matchMedia = window.matchMedia || function () {
  return { matches: false, addListener() {}, removeListener() {} };
};
window.HTMLCanvasElement.prototype.getContext = () => null;

const errors = [];
window.addEventListener("error", (e) => errors.push(e.error ? (e.error.stack || String(e.error)) : e.message));

function runInWindow(code, label) {
  try {
    const fn = new window.Function("window", "document", "React", "ReactDOM", "console",
      "'use strict';\n" + code + "\n//# sourceURL=" + label);
    fn(window, window.document, window.React, window.ReactDOM, console);
  } catch (e) {
    errors.push(label + ": " + (e.stack || e.message));
  }
}

for (const s of scripts) {
  let code = s.body;
  let label = s.src || "inline";
  if (s.src) {
    const filePath = path.resolve(htmlDir, s.src);
    if (!fs.existsSync(filePath)) {
      errors.push("Missing file: " + s.src);
      continue;
    }
    code = fs.readFileSync(filePath, "utf8");
  }
  if (s.isBabel) {
    try {
      const out = babel.transformSync(code, {
        presets: [["@babel/preset-react", { runtime: "classic" }]],
        filename: label,
      });
      code = out.code;
    } catch (e) {
      console.error("BABEL SYNTAX ERROR in " + label + ":\n" + e.message);
      process.exit(1);
    }
  }
  runInWindow(code, label);
}

setTimeout(() => {
  const root = window.document.getElementById("root");
  const html = root ? root.innerHTML : "";
  console.log("---- " + target + (queryArg ? "?" + queryArg : "") + " ----");
  if (errors.length) {
    console.log("JS ERRORS:");
    errors.forEach((e) => console.log(" - " + e));
  }
  if (!html || html.trim() === "") {
    console.log("RESULT: FAIL — #root is empty (nothing rendered)");
    process.exitCode = 1;
  } else if (errors.length) {
    console.log("RESULT: FAIL — rendered but with JS errors");
    process.exitCode = 1;
  } else {
    console.log("RESULT: OK — rendered, " + html.length + " chars in #root");
    process.exitCode = 0;
  }
}, 150);
