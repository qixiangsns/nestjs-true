const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = function (options) {
  return {
    ...options,
    devtool: 'inline-source-map',
    plugins: [
      ...options.plugins,
      new ESLintPlugin({
        exclude: ['node_modules', 'dist'],
        extensions: ['ts'],
        fix: true,
      }),
    ],
  };
};
