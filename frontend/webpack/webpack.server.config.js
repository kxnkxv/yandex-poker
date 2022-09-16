const path = require('path')
const nodeExternals = require('webpack-node-externals')

const { IS_DEV, DIST_DIR, SRC_DIR } = require('./env.js')
const fileLoader = require('./loaders/file')
const cssLoader = require('./loaders/css')
const jsLoader = require('./loaders/js')

const config = {
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.join(SRC_DIR, '/ssr/server'),
  module: {
    rules: [fileLoader.server, cssLoader.server, jsLoader.server],
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: DIST_DIR,
    publicPath: '/www/',
    clean: false,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
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
    //plugins: [new TsconfigPathsPlugin({ configFile: '../tsconfig.json' })],
  },

  devtool: 'source-map',

  performance: {
    hints: IS_DEV ? false : 'warning',
  },

  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],

  optimization: { nodeEnv: false },
}

module.exports = config
