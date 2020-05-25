/* eslint-disable */
const glob = require('glob-all');
const path = require('path');

// 测试生成 html 文件
it('Checking generated html file', () => {
  const files = glob.sync([
    path.join(__dirname, 'template/dist/index.html'),
    path.join(__dirname, 'template/dist/search.html')
  ]);
  expect(files.length).toBeGreaterThan(0);
});

// 测试生成 js 文件
it('Checking generated css file', () => {
  const files = glob.sync([
    path.join(__dirname, 'template/dist/index_*.js'),
    path.join(__dirname, 'template/dist/search*.js')
  ]);
  expect(files.length).toBeGreaterThan(0);
});
