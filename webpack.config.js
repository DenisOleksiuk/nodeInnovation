const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './src/js/app.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: 'dist',
    hot: true,
    inline: true,
    open: true,
    port: 3000,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './assets'),
          to: path.resolve(__dirname, './dist/assets'),
        },
      ],
    }),
  ],
  module: {
    rules:
        [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: './',
            },
          },
        ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
};
