const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sourcePath = path.join(__dirname, '../src');
const staticsPath = path.join(__dirname, '../dist');
const htmlPath = path.join(__dirname, '../public/index.html');

module.exports = {
  context: sourcePath,
  output: {
    path: staticsPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg\ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      sourcePath,
      'node_modules'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: htmlPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    })
  ]
}