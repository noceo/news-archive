let axios = require('axios').default
const Parser = require('rss-parser')
const parser = new Parser()
const Crawler = require('crawler')
const { DateTime } = require('luxon')

const crawler = new Crawler({
  maxConnections: 10,
})

function Faz() {
  this.routes = [
    'politik',
    'wirtschaft',
    'finanzen',
    'feuilleton',
    'sport',
    'gesellschaft',
  ]

  this.config = () => {
    axios = axios.create({
      baseURL: 'https://www.faz.net/rss/aktuell/',
    })
  }

  this.config()

  this.getAllArticles = async () => {
    let foundArticles = []
    for (const route of this.routes) {
      try {
        const result = await axios.get(route)
        const parsedXML = await parser.parseString(result.data)
        const article = await getArticle(parsedXML.items[0].link)
        foundArticles.push(article)
      } catch (error) {
        console.log(error)
      }
    }
    return foundArticles
  }

  function getArticle(uri) {
    return new Promise(function (resolve, reject) {
      crawler.queue({
        uri: uri,
        callback: (err, res, done) => {
          if (err) {
            console.log(err)
            done()
            reject(err)
          } else {
            const $ = res.$
            let article = $('script[type="application/ld+json"]').eq(1).html()
            article = JSON.parse(article)
            if (article.isAccessibleForFree.endsWith('False')) {
              done()
              reject()
            }
            article.datePublished = article.datePublished.replace('CEST ', '')
            let publishDate = DateTime.fromFormat(
              article.datePublished,
              'EEE MMM dd HH:mm:ss yyyy'
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
            done()
            resolve(article)
          }
        },
      })
    })
  }
}

module.exports = Faz
