import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import ErrorType from '../errors'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const authors = await prisma.author.findMany()
    if (authors) {
      res.status(200).json(authors)
      return
    }
    throw new Error('No authors found.')
  } catch (error) {
    error.type = ErrorType.NotFound
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
    console.log(ErrorType)
    error.type = ErrorType.NotFound
    next(error)
  }
})

export default router
