const Faz = require('./scrapers/faz')
const faz = new Faz()
// const NYTimes = require('./scrapers/nytimes')
// const nytimes = new NYTimes()

const publishers = {
  FAZ: 'FAZ',
  NY_TIMES: 'NY_TIMES',
}

const scrapers = [faz]

module.exports = {
  publishers,
  scrapers,
}
