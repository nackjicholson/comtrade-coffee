/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackSharedConfig = require('../webpack.config');

// Config which tells webpack-dev-server to bundle the
// comtradeCoffeeApp on the fly and provide hot module replacement
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

// Extends the shared config from ../webpack.config.js with the devServerConfig
var webpackConfig = Object.assign({}, webpackSharedConfig, devServerConfig);

// Start the webpack-dev-server, and pass it the configured webpack bundler instance.
var bundler = webpack(webpackConfig);
var server = new WebpackDevServer(bundler, {
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
