import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import ParameterError from '@/errors/parameter-error'
import NotFoundError from '@/errors/notfound-error'

const prisma = new PrismaClient()
const router = Router()

router.param('id', (req, res, next, id, name) => {
  req.params[name] = parseInt(id, 10)
  if (isNaN(req.params[name])) {
    next(new ParameterError('Parameter id must be of type Integer.'))
  } else {
    next()
  }
})

router.get('/', async (req, res, next) => {
  try {
    if (req.query.from) {
      const from = new Date(req.query.from)
      const to = req.query.to ? new Date(req.query.to) : new Date()
      if (to < from) throw new ParameterError('Invalid date range.')
      let articles = await prisma.article.findMany({
        where: {
          published_at: {
            gte: from,
            lt: to,
          },
        },
        orderBy: {
          published_at: 'desc',
        },
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

      if (articles.length > 0) {
        articles.map((article) => delete article.publisher_id)
        if (req.query.groupBy === 'published_at')
          articles = groupBy(articles, 'published_at')
        res.status(200).json(articles)
        return
      }
      throw new NotFoundError(`No articles found between ${from} and ${to}.`)
    }

    let articles = await prisma.article.findMany({
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

    if (articles.length > 0) {
      articles.map((article) => delete article.publisher_id)
      if (req.query.groupBy === 'published_at')
        articles = groupBy(articles, 'published_at')
      res.status(200).json(articles)
      return
    }
    throw new NotFoundError('No articles found.')
  } catch (error) {
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
    throw new NotFoundError(`No article found with id ${req.params.id}`)
  } catch (error) {
    next(error)
  }
})

function groupBy(articles, key) {
  if (!(key in articles[0])) return articles
  return articles.reduce((result, currentItem) => {
    const timestamp = new Date(currentItem['published_at'])
    const formatDate = `${timestamp.getFullYear()}-${
      timestamp.getMonth() + 1
    }-${timestamp.getDate()}`
    ;(result[formatDate] = result[currentItem['published_at']] || []).push(
      currentItem
    )
    return result
  }, {})
}

export default router
