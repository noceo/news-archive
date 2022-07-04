import CustomError from './custom-error'

class NotFoundError extends CustomError {
  constructor() {
    super('The requested resource could not be found.', 404)
    this.name = 'Not Found Error'
  }
}

export default NotFoundError
