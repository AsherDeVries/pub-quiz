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
      {
        test: /\.jsx?$/,                // for every file that ends with '.js' or '.jsx'
        exclude: /node_modules/,        // except for npm modules in the 'node_modules' directory
        use: [                          // process the file first with Babel, then with the React Hot Loader
          "babel-loader"
        ]
      }
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
