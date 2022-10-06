const clientConfigDev = require('./webpack/webpack.config.dev')
const clientConfigProd = require('./webpack/webpack.config.prod')
const serverConfig = require('./webpack/webpack.server.config')

if (process.env.NODE_ENV === 'production') {
  console.log('BUILD PROD', process.env.NODE_ENV)
  module.exports = [clientConfigProd, serverConfig]
} else {
  console.log('BUILD DEV', process.env.NODE_ENV)
  module.exports = [clientConfigDev, serverConfig]
}
