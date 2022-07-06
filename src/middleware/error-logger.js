const errorLogger = (error, request, response, next) => {
  console.log(`Error Logger: ${error.message}`)
  next(error)
}

export default errorLogger
