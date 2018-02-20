const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0',
    'webpack/hot/only-dev-server',
    'index.js'
  ],
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    hot: true,
    contentBase: './src',
    compress: false,
    port: 3000,
    stats: { colors: true }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        SC_CLIENT_ID: JSON.stringify(process.env.SC_CLIENT_ID)
      }
    })
  ]
});