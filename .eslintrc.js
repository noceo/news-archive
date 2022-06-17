module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: module,
  },
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['dist/**'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
}
