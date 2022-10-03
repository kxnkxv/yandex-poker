const { merge } = require('webpack-merge')

const common = require('./webpack.config.common.js')

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const VERSION = require('../package.json').version;

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  bail: true,
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../dist'),
    pathinfo: true,
    filename: 'static/js/[name].bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    assetModuleFilename: 'static/media/[name].[hash:8].[ext]',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    historyApiFallback: true,
    compress: true,
    port: 4000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'assets/js/vendor.js',
          priority: -20,
          reuseExistingChunk: true,
          chunks: 'all',
        },
        common: {
          chunks: 'all',
          minChunks: 2,
          filename: 'assets/js/[name].js',
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    emitOnErrors: false,
  },
  plugins: [new ReactRefreshPlugin(),  new HtmlWebpackPlugin({
    filename: 'index.html',
    favicon: './www/favicon.svg',
    template: './www/index.html',
    inject: true,
    hash: true,
    chunksSortMode: 'none',
    version: VERSION,
  }),],
}
module.exports = merge(common, devConfig)