const path = require('path');
const webpack = require('webpack');
// A `rm -rf` util for nodejs
const rimraf = require('rimraf');

// 进入 template 目录
process.chdir(path.join(__dirname, 'template'));

// 先把 dist 目录删掉
// 这里执行 node index.js 的时候目录是在 test/smoke/index
rimraf('./dist', () => {
  // eslint-disable-next-line
  const prodConfig = require('../../lib/webpack.prod');
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err); // eslint-disable-line
      process.exit(2);
    }
    // eslint-disable-next-line
    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false
      })
    );
  });
});
