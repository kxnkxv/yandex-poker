const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
    alias: {
      components: path.resolve(__dirname, 'src/features'),
      core: path.resolve(__dirname, 'src/core'),
      pages: path.resolve(__dirname, 'src/pages'),
      types: path.resolve(__dirname, 'src/images'),
      api: path.resolve(__dirname, 'src/api'),
    },
  },
  devServer: {
    port: 3000,
    historyApiFallback: true
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
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './www/index.html',
    }),
  ],
}
