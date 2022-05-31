const express = require('express')
const { PrismaClient } = require('@prisma/client')
const errors = require('../errors')
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        publisher: true,
        authors: {
          select: { author: true },
        },
        categories: {
          select: { category: true },
        },
      },
    })
    if (articles) {
      articles.map((article) => delete article.publisher_id)
      res.status(200).json(articles)
      return
    }
    throw new Error('No articles found.')
  } catch (error) {
    error.type = errors.NotFound
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const article = await prisma.article.findUnique({
      // eslint-disable-next-line no-undef
      where: { id: BigInt(req.params.id) },
      include: {
        publisher: true,
        authors: {
          select: { author: true },
        },
        categories: {
          select: { category: true },
        },
      },
    })
    if (article) {
      delete article.publisher_id
      res.status(200).json(article)
      return
    }
    throw new Error('The requested article could not be found.')
  } catch (error) {
    error.type = errors.NotFound
    next(error)
  }
})

module.exports = router