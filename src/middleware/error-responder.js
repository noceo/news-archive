import { NotFound } from '../errors'

const errorResponder = (error, req, res, next) => {
  console.log('Error middleware called!' + NotFound)
  if (error.type == NotFound) {
    res.status(NotFound).json({
      error: 'The requested resource could not be found.',
    })
    return
  }
  const status = error.status || 400
  res.status(status).json({ error: error.message })
}

export default errorResponder
