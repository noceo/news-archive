import express from 'express'
import cors from 'cors'
import api from './api-v1/index'
import errorLogger from './middleware/error-logger'
import errorResponder from './middleware/error-responder'
import invalidPathHandler from './middleware/invalid-path-handler'

const app = express()
app.use(cors())
app.use('/api/v1', api)
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

export default app
