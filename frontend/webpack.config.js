const clientConfigDev = require('./webpack/webpack.config.dev')
const clientConfigProd = require('./webpack/webpack.config.prod')
const serverConfig = require('./webpack/webpack.server.config')

module.exports = [clientConfigDev, clientConfigProd, serverConfig]
