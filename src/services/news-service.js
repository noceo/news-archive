import {
  saveArticleToDatabase,
  checkArticleForRedundancy,
} from '@helpers/database'

async function runScrapers(scrapers) {
  return Promise.allSettled(
    scrapers.map(async (scraper) => {
      try {
        const articles = await scraper.getAllArticles()
        return Promise.allSettled(
          articles.map(async (article) => {
            if (await checkArticleForRedundancy(article.title)) {
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

export { runScrapers }
