const { scraperFunctions } = require('./publishers')

async function getArticles() {
  await Promise.allSettled(scraperFunctions.map((func) => func()))
}

// getArticles()

module.exports = {
  getArticles: getArticles,
}
