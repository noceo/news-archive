require('dotenv').config()
const express = require('express')
const app = express()
const api = require('./api-v1/index')
const port = 3000
const errorLogger = require('./middleware/error-logger')
const errorResponder = require('./middleware/error-responder')
const invalidPathHandler = require('./middleware/invalid-path-handler')
// const searchArticlesJob = require('./jobs/search-articles')

// searchArticlesJob()

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
