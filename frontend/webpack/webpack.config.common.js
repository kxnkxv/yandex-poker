const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/client.tsx',
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
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './www/index.html',
      favicon: './www/favicon.svg',
      filename: 'index.html',
    }),
  ]
}
