let axios = require('axios').default
const Parser = require('rss-parser')
const parser = new Parser()
const Crawler = require('crawler')
const saveArticleToDatabase = require('../helpers/database')
const { DateTime } = require('luxon')

const crawler = new Crawler({
  maxConnections: 10,
  callback: (err, res, done) => {
    if (err) {
      console.log(err)
    } else {
      const $ = res.$
      let article = $('script[type="application/ld+json"]').eq(1).html()
      article = JSON.parse(article)
      if (article.isAccessibleForFree.endsWith('False')) {
        done()
      }
      article.datePublished = article.datePublished.replace('CEST ', '')
      let publishDate = DateTime.fromFormat(
        article.datePublished,
        'EEE MMMM dd HH:mm:ss yyyy'
      )
      publishDate = publishDate.setZone('UTC+2')
      article = {
        title: article.headline,
        subtitle: article.description,
        copy: article.articleBody,
        published_at: publishDate.toJSDate(),
        checked_out_at: new Date(),
        publisher: article.publisher.name,
        authors: [article.author],
      }
      saveArticleToDatabase(article)
    }
    done()
  },
})

axios = axios.create({
  baseURL: 'https://www.faz.net/rss/aktuell/',
})

const routes = [
  'politik',
  'wirtschaft',
  'finanzen',
  'feuilleton',
  'sport',
  'gesellschaft',
]

const getArticles = async () => {
  for (const route of routes) {
    try {
      const result = await axios.get(route)
      const parsedXML = await parser.parseString(result.data)
      crawler.queue(parsedXML.items[0].link)
    } catch (error) {
      console.log('Axios Error', error.response)
    }
  }
}

module.exports = getArticles
