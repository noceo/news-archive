import CustomError from './custom-error'

class ParameterError extends CustomError {
  constructor(message) {
    super(message, 400)
    this.name = 'Parameter Error'
  }
}

export default ParameterError