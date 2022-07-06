import { Router } from 'express'
import articleRoutes from './article'
import authorRoutes from './author'
import publisherRoutes from './publisher'

const router = Router()
router.use('/articles', articleRoutes)
router.use('/authors', authorRoutes)
router.use('/publishers', publisherRoutes)

// eslint-disable-next-line no-undef
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export default router
