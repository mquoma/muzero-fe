var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './app/index'
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEVTOOLS__': process.env.DEVTOOLS === 'true' ? true: false,
      '__APIENV__': process.env.APIENV || JSON.stringify('dev')
    }),
    new HtmlwebpackPlugin({
      title: '',
      filename: 'index.html',
      template: 'index.tpl.html'
    })
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap'},
      { test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'app') },
      { test: /\.(png|jpg|svg|gif)$/, loader: 'url?limit=25000' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}
    ]
  }
}
