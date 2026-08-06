# Проверка страниц прототипа

`render-check.js` — прогоняет HTML-страницу прототипа через Babel (проверка синтаксиса
`<script type="text/babel">`) и рендерит её в jsdom через настоящий React 18, проверяя,
что `#root` не пустой и не было JS-ошибок. Это тот же принцип, что рекомендован в ТЗ:
"прогоняй файлы через Babel-проверку синтаксиса и рендер-тест в jsdom".

## Установка (один раз)

```
npm install jsdom @babel/core @babel/preset-react react@18.3.1 react-dom@18.3.1
```

## Запуск

```
node test/render-check.js hr/template.html
node test/render-check.js hr/plan.html --query "kind=assigned&id=onboarding"
```

`interaction-test.js` и `interaction-vacancies.js` — примеры того же харнесса
с имитацией кликов (переключение свитчей, открытие модалок) для проверки
интерактивных сценариев, а не только факта рендера.
