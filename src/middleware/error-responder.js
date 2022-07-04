const errorResponder = (error, req, res, next) => {
  res.status(error.status).json({
    error: {
      name: error.name,
      status: error.status,
      message: error.message,
      timestamp: error.timestamp,
    },
  })
}

export default errorResponder
