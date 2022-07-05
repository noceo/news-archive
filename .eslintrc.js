module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist/**'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
}
