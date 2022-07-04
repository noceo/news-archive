class CustomError extends Error {
  constructor(message, status) {
    super(message)
    this.timestamp = new Date()
    this.status = status
  }
}

export default CustomError
