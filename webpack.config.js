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
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),

    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
  ],

  // Create Sourcemaps for the bundle
  devtool: 'cheap-module-source-map',
};