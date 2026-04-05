const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  plugins: [
    new ESLintPlugin({
      exclude: ['node_modules', 'dist'],
      extensions: ['ts'],
      fix: true,
    }),
  ],
};
