const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    // CSS 代码压缩
    new OptimizeCssAssetsPlugin({
      // 正则匹配需要处理的 css 文件
      assetNameRegExp: /\.css$/g,
      // CSS 处理器
      // eslint-disable-next-line
      cssProcessor: require('cssnano'),
      // 传递给cssProcessor的选项，默认为 {}
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      // 指示插件是否可以将消息打印到控制台的布尔值，默认为true
      canPrint: true
    })
  ],
  optimization: {
    splitChunks: {
      // async：异步引入的库需要进行分离
      // initial：同步引入的库进行分离
      // all：全部（推荐）
      chunks: 'all',
      minSize: 0,
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
};

module.exports = merge(baseConfig, prodConfig);
