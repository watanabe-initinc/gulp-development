const webpack = require('webpack');
const path = require('path');
const src = path.join(__dirname, '..', 'src', 'assets', 'js');
const dist = 'dist';

module.exports = {
  mode: 'development',
  entry: {
    "assets/js/main": src + '/app.js'
  },
  output: {
    path: path.join(__dirname, dist),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false
                }
              ]
            ]
          }
        }]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      IScroll: 'iscroll'
    })
  ]
};
