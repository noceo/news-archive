import NotFoundError from '@/errors/notfound-error'

const invalidPathHandler = (req, res, next) => {
  const error = new NotFoundError()
  res.status(error.status).json({
    error: {
      name: error.name,
      status: error.status,
      message: error.message,
      timestamp: error.timestamp,
    },
  })
}

export default invalidPathHandler
