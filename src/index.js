import 'dotenv/config'
import app from '@/app'
import searchArticlesJob from '@jobs/search-articles'

const port = process.env.API_PORT

searchArticlesJob()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
