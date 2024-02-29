import express, { urlencoded } from 'express'
import cors from 'cors'
import logger from '@configs/log/log.config'
import path from 'path'
import GlobalExceptionMiddleware from '@middlewares/global-exception.middleware'
import { categoryRouter } from './routers/category.router'
import { orchidRouter } from './routers/orchid.router'

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  urlencoded({
    extended: true
  })
)
app.use(express.json())

app.use(logger)

/* --- Routes --- */
app.use('/categories', categoryRouter)
app.use('/orchids', orchidRouter)
/* --- End Routes --- */
app.use(GlobalExceptionMiddleware.handle)

export { app }
