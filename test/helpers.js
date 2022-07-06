function testSuccess(response) {
  expect(response.statusCode).toBe(200)
  expect(isValidJson(response.text)).toBe(true)
}

function testFailure(response) {
  expect(response.statusCode).toBeGreaterThanOrEqual(400)
  expect(response.statusCode).toBeLessThan(600)
  expect(isValidJson(response.text)).toBe(true)
}

function isValidError(err) {
  expect(err).toHaveProperty('error')
  expect(err.error).toBeDefined()
  expect(err.error).not.toBe(null)

  const error = err.error

  expect(error).toHaveProperty('name')
  expect(error.name).toBeDefined()
  expect(error.name).not.toBe(null)

  expect(error).toHaveProperty('status')
  expect(error.status).toBeDefined()
  expect(error.status).not.toBe(null)

  expect(error).toHaveProperty('message')
  expect(error.message).toBeDefined()
  expect(error.message).not.toBe(null)

  expect(error).toHaveProperty('timestamp')
  expect(error.timestamp).toBeDefined()
  expect(error.timestamp).not.toBe(null)
}

function isValidJson(text) {
  try {
    JSON.parse(text)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export { testSuccess, testFailure, isValidError }
