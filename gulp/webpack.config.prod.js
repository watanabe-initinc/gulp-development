const webpack = require('webpack');
const glob = require('glob');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
const build = '/build';

module.exports = {
  mode: 'production',
  entry: entries,
  output: {
    path: path.join(__dirname, build),
    filename: '[name]'
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
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
  devtool: 'none',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      IScroll: 'iscroll'
    })
  ]
};
