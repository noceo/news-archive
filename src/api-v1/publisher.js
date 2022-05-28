const express = require('express')
const { PrismaClient } = require('@prisma/client')
const errors = require('../errors')
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const publishers = await prisma.publisher.findMany()
    if (publishers) {
      res.status(200).json(publishers)
      return
    }
    throw new Error('No publishers found.')
  } catch (error) {
    error.type = errors.NotFound
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
    throw new Error('The requested publisher could not be found.')
  } catch (error) {
    error.type = errors.NotFound
    next(error)
  }
})

module.exports = router
