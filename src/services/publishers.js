const faz = require('./faz')

const publishers = {
  FAZ: 'FAZ',
}

const scraperFunctions = [faz]

module.exports = {
  publishers: publishers,
  scraperFunctions: scraperFunctions,
}
