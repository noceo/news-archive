const errorLogger = (error, request, response, next) => {
  console.error(`Error Logger: ${error.message}`)
  next(error)
}

export default errorLogger
