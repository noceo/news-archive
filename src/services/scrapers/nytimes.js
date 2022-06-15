let axios = require('axios').default
const Crawler = require('crawler')
const { AuthorType, MediaType } = require('@prisma/client')

const crawler = new Crawler({
  maxConnections: 10,
})

function NYTimes() {
  this.routes = ['politics'] //, 'business', 'world', 'us', 'sports', 'opinion']

  this.config = () => {
    axios = axios.create({
      baseURL: 'https://api.nytimes.com/svc/topstories/v2/',
    })
    axios.defaults.params = {}
    axios.defaults.params['api-key'] = process.env.NYTIMES_API_KEY
  }

  this.config()

  this.getAllArticles = async () => {
    let foundArticles = []
    for (const route of this.routes) {
      try {
        let result = await axios.get(route + '.json')
        result = result.data.results.find(
          (item) => item.item_type === 'Article'
        )
        const articleText = await getArticleText(result.url)
        const authors = result.byline
          .replace('By ', '')
          .split(' and ')
          .map((author) => {
            return {
              name: author,
              type: AuthorType.PERSON,
            }
          })
        const categories = [result.section.toLowerCase()]
        if (result.subsection) categories.push(result.subsection.toLowerCase())

        const media = article.image.map((image) => {
          return {
            url: image.url,
            type: MediaType.IMAGE,
          }
        })

        const article = {
          title: result.title,
          subtitle: result.abstract,
          copy: articleText,
          published_at: new Date(result.published_date),
          checked_out_at: new Date(),
          publisher: 'New York Times',
          authors,
          categories,
          media,
        }
        foundArticles.push(article)
      } catch (error) {
        console.log(error)
      }
    }
    return foundArticles
  }
}

function getArticleText(uri) {
  return new Promise(function (resolve, reject) {
    crawler.queue({
      uri: uri,
      callback: function (err, res, done) {
        if (err) {
          console.log(err)
          done()
          reject(err)
        } else {
          const $ = res.$
          let article = $('section[name="articleBody"] p')
            .not('[id^=story-ad]')
            .append(' ')
            .text()
          done()
          resolve(article)
        }
      },
    })
  })
}

module.exports = NYTimes
