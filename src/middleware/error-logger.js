const errorLogger = (error, request, response, next) => {
  console.log(`Error ${error.message}`)
  next(error) // calling next middleware
}

export default errorLogger
