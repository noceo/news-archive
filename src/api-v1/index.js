const express = require('express')
const articleRoutes = require('./article')
const authorRoutes = require('./author')
const publisherRoutes = require('./publisher')
const router = express.Router()

router.use('/articles', articleRoutes)
router.use('/authors', authorRoutes)
router.use('/publishers', publisherRoutes)

// eslint-disable-next-line no-undef
BigInt.prototype.toJSON = function () {
  return this.toString()
}

router.get('/', (req, res) => {
  res.send('API')
})

module.exports = router
