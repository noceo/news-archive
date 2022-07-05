import request from 'supertest'
import app from '@/app'
import config from '@test/config'

describe('Test articles path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get(`${config.baseURL}/articles`)
    testSuccess(response)
  })

  test('It should return multiple articles', async () => {
    const response = await request(app).get(`${config.baseURL}/articles`)
    testSuccess(response)
    const articles = JSON.parse(response.text)
    expect(articles).toBeInstanceOf(Array)
    if (articles.length === 0) return
    isValidArticle(articles[0])
  })

  test('It should return a single article', async () => {
    const response = await request(app).get(`${config.baseURL}/articles/1`)
    testSuccess(response)
    const article = JSON.parse(response.text)
    isValidArticle(article)
  })

  test('It should return multiple articles from start to end date', async () => {
    const from = '2012-01-01'
    const to = '2022-01-01'
    const response = await request(app).get(
      `${config.baseURL}/articles?from=${from}&to=${to}`
    )
    testSuccess(response)
    const articles = JSON.parse(response.text)
    expect(articles).toBeInstanceOf(Array)
    if (articles.length === 0) return
    articles.forEach((article) => {
      expect(new Date(article.published_at) >= new Date(from)).toBe(true)
      expect(new Date(article.published_at) <= new Date(to)).toBe(true)
    })
  })

  test('It should return no articles if there were no articles found', async () => {
    const from = '2000-01-01'
    const to = '2010-01-01'
    const response = await request(app).get(
      `${config.baseURL}/articles?from=${from}&to=${to}`
    )
    testSuccess(response)
    const articles = JSON.parse(response.text)
    expect(articles).toBeInstanceOf(Array)
    expect(articles.length).toBe(0)
  })

  test('It should throw an error if the id parameter is not an integer', async () => {
    const response = await request(app).get(`${config.baseURL}/articles/test`)
    testFailure(response)
    const error = JSON.parse(response.text)
    isValidError(error)
  })

  test('It should throw an error if the date range is invalid', async () => {
    const from = '2022-01-01'
    const to = '2020-01-01'
    const response = await request(app).get(
      `${config.baseURL}/articles?from=${from}&to=${to}`
    )
    testFailure(response)
    const error = JSON.parse(response.text)
    isValidError(error)
  })
})

function testSuccess(response) {
  expect(response.statusCode).toBe(200)
  expect(isValidJson(response.text)).toBe(true)
}

function testFailure(response) {
  expect(response.statusCode).toBeGreaterThanOrEqual(400)
  expect(response.statusCode).toBeLessThan(600)
  expect(isValidJson(response.text)).toBe(true)
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

function isValidArticle(article) {
  expect(article).toHaveProperty('id')
  expect(article.id).toBeDefined()
  expect(article.id).not.toBe(null)
  expect(parseInt(article.id)).toEqual(expect.any(Number))

  expect(article).toHaveProperty('title')
  expect(article.title).toBeDefined()
  expect(article.title).not.toBe(null)

  expect(article).toHaveProperty('subtitle')
  expect(article.subtitle).toBeDefined()
  expect(article.subtitle).not.toBe(null)

  expect(article).toHaveProperty('copy')
  expect(article.copy).toBeDefined()
  expect(article.copy).not.toBe(null)

  expect(article).toHaveProperty('published_at')
  expect(article.published_at).toBeDefined()
  expect(article.published_at).not.toBe(null)

  expect(article).toHaveProperty('checked_out_at')
  expect(article.checked_out_at).toBeDefined()
  expect(article.checked_out_at).not.toBe(null)

  expect(article).toHaveProperty('publisher')
  expect(article.publisher).toBeDefined()
  expect(article.publisher).not.toBe(null)

  expect(article).toHaveProperty('authors')
  expect(article.authors).toBeDefined()
  expect(article.authors).not.toBe(null)

  expect(article).toHaveProperty('categories')
  expect(article.categories).toBeDefined()
  expect(article.categories).not.toBe(null)
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
