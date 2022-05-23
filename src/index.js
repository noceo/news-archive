const express = require('express')
const app = express()
var api = require('./api.js')
const port = 3000

app.use('/api', api)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
