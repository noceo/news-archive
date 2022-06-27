import 'module-alias/register'
import dotenv from 'dotenv'
import express from 'express'
import api from './api-v1/index'
import errorLogger from './middleware/error-logger'
import errorResponder from './middleware/error-responder'
import invalidPathHandler from './middleware/invalid-path-handler'
import searchArticlesJob from './jobs/search-articles'

dotenv.config()
const app = express()
const port = 3000

searchArticlesJob()

app.use('/api/v1', api)
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
