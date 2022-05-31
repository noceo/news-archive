const cron = require('node-cron')
const newsService = require('../services/news-service')

module.exports = () => {
  cron.schedule('*/10 * * * * *', () => {
    newsService.getArticles()
    console.log('Scheduled Job!')
  })
}
