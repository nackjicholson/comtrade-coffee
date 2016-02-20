/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackSharedConfig = require('../webpack.config');

var devServerConfig = {
  entry: {
    comtradeCoffeeApp: [
      'webpack-dev-server/client?http://0.0.0.0:3000',
      path.resolve(__dirname, '../src/public/js/comtradeCoffeeApp.js'),
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../src/public/js/dist/'),
    publicPath: '/js/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

var webpackConfig = Object.assign({}, webpackSharedConfig, devServerConfig);

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
  contentBase: 'src/public',
  publicPath: '/js/dist/',
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
});

server.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at localhost:3000');
});
