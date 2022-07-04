import express from 'express'
import api from '@api/index'
import errorLogger from '@middleware/error-logger'
import errorResponder from '@middleware/error-responder'
import invalidPathHandler from '@middleware/invalid-path-handler'

const app = express()
app.use('/api/v1', api)
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

export default app
