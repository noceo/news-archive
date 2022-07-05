import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import ParameterError from '@/errors/parameter-error'

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
    if (req.query.from && req.query.to) {
      const from = new Date(req.query.from)
      const to = new Date(req.query.to)
      if (to < from) throw new ParameterError('Invalid date range.')
      const articles = await prisma.article.findMany({
        where: {
          published_at: {
            gte: new Date(req.query.from),
            lt: new Date(req.query.to),
          },
        },
      })
      console.log(articles)
      if (articles.length > 0) {
        articles.map((article) => delete article.publisher_id)
      }
      res.status(200).json(articles)
      return
    }

    // if (req.query.from) {
    //   const from = new Date(req.query.from)
    //   const to = new Date(req.query.to)
    //   if (to < from) throw new Error('Invalid date range.')
    //   const articles = await prisma.article.findMany({
    //     where: {
    //       published_at: {
    //         gte: new Date(req.query.from),
    //         lt: new Date(req.query.to),
    //       },
    //     },
    //   })
    //   console.log(articles)
    //   if (articles.length > 0) {
    //     articles.map((article) => delete article.publisher_id)
    //   }
    //   res.status(200).json(articles)
    //   return
    // }

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
    if (articles.length > 0) {
      articles.map((article) => delete article.publisher_id)
    }
    res.status(200).json(articles)
    return
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
    }
    res.status(200).json(article)
    return
  } catch (error) {
    next(error)
  }
})

export default router
