const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const rootPath = process.cwd();

// 获取入口文件
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const fileName = glob.sync(path.join(rootPath, './src/*/index.js'));

  fileName.map((item, index) => {
    const entryFile = item.match(/src\/(.*)\/index.js$/);
    const pageName = entryFile && entryFile[1];
    // 设置 entry
    entry[pageName] = fileName[index];
    // 设置 htmlWebpackPlugin
    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        // html 模版:这些文件名字都是事先约定好
        template: path.join(rootPath, `src/${pageName}/index.html`),
        // 打包出来的模版
        filename: `${pageName}.html`,
        // 指定生成的 html 文件需要使用哪些 chunk
        chunks: [pageName],
        inject: true, // 自定注入
        //  minify是用于去压缩一开始就内联在 html 里面的css和js，不是打包生成的 css 和 js
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugins
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(rootPath, 'dist'),
    filename: '[name].js'
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // CSS 提取
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        console.log('build done'); // eslint-disable-line
        if (
          stats.compilation.erros &&
          stats.compilation.erros.length &&
          process.argv.indexOf('--watch') === -1
        ) {
          console.log('build error'); // eslint-disable-line
          process.exit(1);
        }
      });
    }
  ].concat(htmlWebpackPlugins)
};
