import ErrorType from '../errors'

const errorResponder = (error, req, res, next) => {
  if (error.type == ErrorType.NotFound) {
    res.status(ErrorType.NotFound).json({
      error: 'The requested resource could not be found.',
    })
    return
  }
  const status = error.status || 400
  res.status(status).json({ error: error.message })
}

export default errorResponder
