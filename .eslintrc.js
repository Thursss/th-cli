module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-undef': 0,
    'prettier/prettier': 1,
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_|^err|^ev', // _xxx, err, error, ev, event
      },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    semi: 0,
    eqeqeq: 2,
    'no-empty-function': 1, // 禁止空函数
    'no-multi-spaces': 2, // 禁止使用多个空格
    'space-infix-ops': 2, // 要求操作符周围有空格
    'space-in-parens': 2, // 强制在圆括号内使用一致的空格
    'no-var': 2, // 要求使用 let 或 const 而不是 var,
  },
}
