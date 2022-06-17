import { schedule } from 'node-cron'
import { getArticles } from '../services/news-service'

export default () => {
  schedule('*/10 * * * * *', () => {
    getArticles()
    console.log('Scheduled Job!')
  })
}
