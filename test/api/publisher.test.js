import request from 'supertest'
import app from '@/app'
import config from '@test/config'
import { testSuccess, testFailure, isValidError } from '@test/helpers'

describe('Test publishers path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get(`${config.baseURL}/publishers`)
    testSuccess(response)
  })

  test('It should return multiple publishers', async () => {
    const response = await request(app).get(`${config.baseURL}/publishers`)
    testSuccess(response)
    const publishers = JSON.parse(response.text)
    expect(publishers).toBeInstanceOf(Array)
    if (publishers.length === 0) return
    isValidPublisher(publishers[0])
  })

  test('It should return a single publisher', async () => {
    const response = await request(app).get(`${config.baseURL}/publishers/1`)
    testSuccess(response)
    const publishers = JSON.parse(response.text)
    isValidPublisher(publishers)
  })

  test('It should throw an error if the id parameter is not an integer', async () => {
    const response = await request(app).get(`${config.baseURL}/publishers/test`)
    testFailure(response)
    const error = JSON.parse(response.text)
    isValidError(error)
  })

  test('It should throw an error if the id matches no publisher', async () => {
    const response = await request(app).get(`${config.baseURL}/publishers/-1`)
    testFailure(response)
    const error = JSON.parse(response.text)
    isValidError(error)
  })
})

function isValidPublisher(publisher) {
  expect(publisher).toHaveProperty('id')
  expect(publisher.id).toBeDefined()
  expect(publisher.id).not.toBe(null)
  expect(parseInt(publisher.id)).toEqual(expect.any(Number))

  expect(publisher).toHaveProperty('name')
  expect(publisher.name).toBeDefined()
  expect(publisher.name).not.toBe(null)
}
