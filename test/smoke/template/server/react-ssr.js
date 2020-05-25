// 完成 react ssr 工作的中间件,组件在服务端渲染的逻辑都在这个文件内
// const React = require('react');
const fs = require('fs');
const path = require('path');
const { renderToString } = require('react-dom/server');
const Search = require('../dist/search-server');
const data = require('./data.json');

const template = fs.readFileSync(
  path.join(__dirname, '../dist/search.html'),
  'utf-8'
);

const renderMarkup = (str) => {
  const initData = JSON.stringify(data);
  const html = template
    .replace('<!--HTML_PLACEHOLDER-->', str)
    .replace(
      '<!--INITIAL_DATA_PLACEHOLDER-->',
      `<script>window._initdata=${initData}</script>`
    );
  return html;
};

module.exports = async (ctx, next) => {
  const html = renderMarkup(renderToString(Search));

  ctx.body = html;
  return next();
};
