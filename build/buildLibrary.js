/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config');

var libraryConfig = {
  entry: {
    comtradeCoffee: path.resolve(__dirname, '../src/comtradeCoffee.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'commonjs2'
  }
};

var webpackBuildConfig = Object.assign({}, webpackConfig, libraryConfig);

var compiler = webpack(webpackBuildConfig);

compiler.run(function(err, stats) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stats.toString({ colors: true }));
});
