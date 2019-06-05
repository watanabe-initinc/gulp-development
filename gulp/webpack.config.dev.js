const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const entries = {};
const src = './src';
glob
  .sync('**/app.js', {
    ignore: '**/_*.js',
    cwd: src
  })
  .map(function(key) {
    entries[key] = path.resolve(src, key);
    console.log(key);
  });
const dest = '/dest';

module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    path: path.join(__dirname, dest),
    filename: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
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
          }
        ]
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
