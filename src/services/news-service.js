import {
  saveArticleToDatabase,
  checkArticleForRedundancy,
} from '../helpers/database'
import { scrapers } from './publishers'

async function getArticles() {
  return Promise.allSettled(
    scrapers.map(async (scraper) => {
      try {
        const articles = await scraper.getAllArticles()
        return Promise.allSettled(
          articles.map(async (article) => {
            if (await checkArticleForRedundancy()) {
              return
            }
            await saveArticleToDatabase(article)
          })
        )
      } catch (err) {
        console.log(err)
      }
    })
  )
}

export { getArticles }
