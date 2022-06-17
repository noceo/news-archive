import saveArticleToDatabase from '../helpers/database'
import { scrapers } from './publishers'

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

export default {
  getArticles,
}
