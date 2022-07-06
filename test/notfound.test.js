import request from 'supertest'
import app from '@/app'
import config from '@test/config'
import { testFailure } from '@test/helpers'

describe('Test invalid path', () => {
  test('It should response the GET method with an error', async () => {
    const response = await request(app).get(`${config.baseURL}/invalid-path`)
    testFailure(response)
  })
})
