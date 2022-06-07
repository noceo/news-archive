const saveArticleToDatabase = require('../helpers/database')
const { scrapers } = require('./publishers')

async function getArticles() {
  const result = await Promise.allSettled(
    scrapers.map((scraper) => scraper.getAllArticles())
  )
  result.forEach((promise) => {
    if (promise.status === 'rejected') return
    promise.value.forEach((article) => {
      saveArticleToDatabase(article)
    })
  })
}

getArticles()

module.exports = {
  getArticles,
}
