let axios = require('axios').default
const Parser = require('rss-parser')
const parser = new Parser()
const Crawler = require('crawler')
const { DateTime } = require('luxon')
const { AuthorType, MediaType } = require('@prisma/client')

const crawler = new Crawler({
  maxConnections: 10,
})

function Faz() {
  const slugs = {
    politics: 'politik',
    // economy: 'wirtschaft',
    // business: 'finanzen',
    // feuilleton: 'feuilleton',
    // sports: 'sport',
    // society: 'gesellschaft',
  }

  this.routes = Object.entries(slugs).map((item) => {
    return {
      category: item[0],
      slug: item[1],
    }
  })

  this.config = () => {
    axios = axios.create({
      baseURL: 'https://www.faz.net/rss/aktuell/',
    })
  }

  this.config()

  this.getAllArticles = async () => {
    console.log(this.routes)
    let foundArticles = []
    for (const route of this.routes) {
      try {
        const result = await axios.get(route.slug)
        const parsedXML = await parser.parseString(result.data)
        const article = await getArticle(parsedXML.items[0].link)
        article.categories = [route.category]
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
            done()
            reject(err)
          } else {
            const $ = res.$
            let article = $('script[type="application/ld+json"]').eq(1).html()
            article = JSON.parse(article)
            article.datePublished = article.datePublished.replace('CEST ', '')
            let publishDate = DateTime.fromFormat(
              article.datePublished,
              'EEE MMM dd HH:mm:ss yyyy'
            )
            publishDate = publishDate.setZone('UTC+2')
            console.log(article)

            let authors = Array.isArray(article.author)
              ? article.author
              : [article.author]
            authors = authors.map((author) => {
              const type =
                author['@type'] === 'Person'
                  ? AuthorType.PERSON
                  : AuthorType.ORGANIZATION
              return {
                name: author.name,
                type: type,
              }
            })

            const media = [
              {
                url: article.image[0].url,
                type: MediaType.IMAGE,
              },
            ]

            article = {
              title: article.headline,
              subtitle: article.description,
              copy: article.articleBody,
              published_at: publishDate.toJSDate(),
              checked_out_at: new Date(),
              publisher: article.publisher.name,
              authors,
              media,
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
