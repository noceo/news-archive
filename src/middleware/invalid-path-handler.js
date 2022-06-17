const invalidPathHandler = (request, response, next) => {
  response.status(404).json({ error: 'Invalid Path' })
}

export default invalidPathHandler
