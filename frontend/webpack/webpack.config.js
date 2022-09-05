const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

let isProd = true;

const optimization = () => {
  const config = {};
  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
    ];
    config.minimize = true;
  }
  return config;
};

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.[fullhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      core: path.resolve(__dirname, '../src/core'),
      hooks: path.resolve(__dirname, '../src/hooks'),
      images: path.resolve(__dirname, '../src/images'),
      pages: path.resolve(__dirname, '../src/pages'),
      styles: path.resolve(__dirname, '../src/styles'),
      types: path.resolve(__dirname, '../src/types'),
      utils: path.resolve(__dirname, '../src/utils'),
      '@': path.resolve(__dirname, '../src'),
    },
  },
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  optimization: optimization(),
  plugins: [
    new HtmlWebpackPlugin({
      template: './www/index.html',
      favicon: './www/favicon.svg',
    }),
    new CleanWebpackPlugin(),
  ],
}
