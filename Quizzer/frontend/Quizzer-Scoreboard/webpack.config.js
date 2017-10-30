var webpack = require('webpack');
var path = require('path');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: 'cheap-module-eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, use: ["babel-loader"]},
      {test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'}
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),         // The bundle must be stored in 'dist' directory,
    publicPath: '/',                   // but http request should find them in the root of the site.
    filename: 'bundle.js'              // The file containing the combined modules (the bundle) should be called 'bundle.js'
  },
  devServer: {
    contentBase: './dist',             // Dev Server serves from 'dist' directory. Both generated bundles and
                                        // static files (html,css, images) must live in this directory.
    hot: true                          // Use the hot module replacement plugin (used by React Hot Loader).
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
