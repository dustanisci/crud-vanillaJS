const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
  entry: './src/index.js',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      })]
  },
  performance: {
    hints: false,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader'
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      linkType: 'text/css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: '/index.html',
      title: 'CRUD',
    }),
  ],
};