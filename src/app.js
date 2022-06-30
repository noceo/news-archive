import express from 'express'
import api from './api-v1/index'
import errorLogger from './middleware/error-logger'
import errorResponder from './middleware/error-responder'
import invalidPathHandler from './middleware/invalid-path-handler'
import searchArticlesJob from './jobs/search-articles'

const app = express()

searchArticlesJob()

app.use('/api/v1', api)
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

export default app
