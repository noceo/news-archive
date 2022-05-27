const errors = require('../errors')

const errorResponder = (error, req, res, next) => {
  console.log('Error middleware called!' + errors.NotFound)
  if (error.type == errors.NotFound) {
    res.status(errors.NotFound).json({
      error: 'The requested resource could not be found.',
    })
    return
  }
  const status = error.status || 400
  res.status(status).json({ error: error.message })
}

module.exports = errorResponder
