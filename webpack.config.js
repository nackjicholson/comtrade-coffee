/*eslint-disable */
var path = require('path');

// Shared config for build scripts.
// entry and output are left out here because the build scripts
// extend those fields into the config themselves.
module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.resolve('./src')
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  stats: {
    colors: true
  }
};
