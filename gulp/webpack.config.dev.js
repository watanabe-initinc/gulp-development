const webpack = require('webpack');
const path = require('path');
const src = './src/assets/js/';
const dest = '/dest';

module.exports = {
  mode: 'development',
  entry: {
    'app': `${src}app.js`
  },
  output: {
    path: path.join(__dirname, dest),
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
              ['@babel/preset-env', {
                'modules': false
              }]
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
      jQuery: 'jquery'
    })
  ]
};
