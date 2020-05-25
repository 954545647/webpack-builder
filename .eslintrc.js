module.exports = {
  // 使用 babel-eslint 解析器
  parser: 'babel-eslint',
  // 继承 Airbnb的规则
  extends: 'airbnb-base',
  // 生效的环境，不然没有 window或者document变量
  env: {
    browser: true,
    node: true
  },
  rules: {
    // 结尾分号
    semi: 'error',
    // 要求或禁止使用拖尾逗号
    'comma-dangle': [2, 'never'],
    'operator-linebreak': 0
  }
};
