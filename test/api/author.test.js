import request from 'supertest'
import app from '@/app'
import config from '@test/config'
import { testSuccess, testFailure, isValidError } from '@test/helpers'

describe('Test authors path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get(`${config.baseURL}/authors`)
    testSuccess(response)
  })

  test('It should return multiple authors', async () => {
    const response = await request(app).get(`${config.baseURL}/authors`)
    testSuccess(response)
    const authors = JSON.parse(response.text)
    expect(authors).toBeInstanceOf(Array)
    if (authors.length === 0) return
    isValidAuthor(authors[0])
  })

  test('It should return a single author', async () => {
    const response = await request(app).get(`${config.baseURL}/authors/1`)
    testSuccess(response)
    const author = JSON.parse(response.text)
    isValidAuthor(author)
  })

  test('It should throw an error if the id parameter is not an integer', async () => {
    const response = await request(app).get(`${config.baseURL}/authors/test`)
    testFailure(response)
    const error = JSON.parse(response.text)
    isValidError(error)
  })

  test('It should throw an error if the id matches no author', async () => {
    const response = await request(app).get(`${config.baseURL}/authors/-1`)
    testFailure(response)
    const error = JSON.parse(response.text)
    isValidError(error)
  })
})

function isValidAuthor(author) {
  expect(author).toHaveProperty('id')
  expect(author.id).toBeDefined()
  expect(author.id).not.toBe(null)
  expect(parseInt(author.id)).toEqual(expect.any(Number))

  expect(author).toHaveProperty('name')
  expect(author.name).toBeDefined()
  expect(author.name).not.toBe(null)

  expect(author).toHaveProperty('type')
  expect(author.type).toBeDefined()
  expect(author.type).not.toBe(null)
}
