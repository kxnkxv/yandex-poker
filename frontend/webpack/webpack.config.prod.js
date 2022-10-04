const { merge } = require('webpack-merge')
const webpack = require('webpack')

const common = require('./webpack.config.common.js')

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

process.env.NODE_ENV = 'production';
const VERSION = require('../package.json').version;

const prodConfig = {
  mode: 'production',
  stats: 'errors-only',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash:8].[ext]',
    clean: false,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          filename: 'static/js/vendor.[contenthash].js',
          reuseExistingChunk: true,
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
    emitOnErrors: false,
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin(),
      new CssMinimizerPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        filename: 'index.html',
        favicon: './www/favicon.svg',
        template: './www/index.html',
        chunksSortMode: 'none',
        version: VERSION,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
        VERSION: VERSION,
        USE_API_MOCKS: 'false',
      }),
    ],
  },
  plugins: [new MiniCssExtractPlugin(), /*new BundleAnalyzerPlugin(),*/ new CompressionPlugin()],
}
module.exports = merge(common, prodConfig)
