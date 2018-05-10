// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    document: true,
    localStorage: true,
    window: true
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}],
    "no-trailing-spaces": 0,
    "no-mixed-spaces-and-tabs": 0,
    "no-tabs": 0,
    "handle-callback-err": 0,
    "operator-linebreak": 0,
    "no-undef": 0
  }
}
