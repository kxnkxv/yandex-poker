const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|mp3|ttf)$/

const fileLoader = {
  client: {
    loader: 'url-loader',
    test: fileRegex,
  },
  server: {
    loader: 'url-loader',
    test: fileRegex,
  },
}

module.exports = fileLoader
