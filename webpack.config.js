var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname + '/src'),
  entry: './index.js',

  output: {
    path: path.join(__dirname + '/dist'),
    filename: '[name].js' // based on the entry point key name
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),

    new webpack.NoErrorsPlugin(),
  ],

  devtool: 'cheap-source-map',
};