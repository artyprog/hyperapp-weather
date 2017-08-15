var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js",
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader!transform-loader?hyperxify"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      inlineSource: '.(css)$',
      title: 'Weather by Hyperapp'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ]
}
