const path = require('path');
const common = require('./webpack.common');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const mockHooker = require('../mock/hooker');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 8081,
    quiet: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(__dirname, '../dist'),
    before(app) {
      mockHooker(app);
    }
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Go: http://localhost:8081']
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});