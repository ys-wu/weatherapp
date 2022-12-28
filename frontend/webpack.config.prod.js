const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const GLOBALS = {
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'https://weather.yushengwu.com/api'),
};

module.exports = {
  entry: {
    main: ['@babel/polyfill', path.join(__dirname, 'src/index.jsx')],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] }, modules: false }],
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      // filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/public/img/', to: 'img/' },
        { from: 'src/public/favicon.ico', to: './' },
        { from: 'src/public/style.css', to: './' },
      ],
    }),
    new webpack.DefinePlugin(GLOBALS),
  ],
};
