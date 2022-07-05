import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

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
    const authors = await prisma.author.findMany()
    if (authors) {
      res.status(200).json(authors)
      return
    }
    throw new Error('No authors found.')
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const author = await prisma.author.findUnique({
      // eslint-disable-next-line no-undef
      where: { id: BigInt(req.params.id) },
    })
    if (author) {
      res.status(200).json(author)
      return
    }
    throw new Error('The requested author could not be found.')
  } catch (error) {
    next(error)
  }
})

export default router
