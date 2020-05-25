module.exports = {
  // 使用 babel-eslint 解析器
  parser: 'babel-eslint',
  // 继承 Airbnb的规则
  extends: 'airbnb',
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
    // 要求箭头函数的参数使用圆括号
    'arrow-parens': 'off',
    // 使用JSX的时候可以使用 .js文件
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/click-events-have-key-events': 0,
    // 'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-console': 'off',
    'operator-linebreak': 0,
    'func-names': 0
  }
};
