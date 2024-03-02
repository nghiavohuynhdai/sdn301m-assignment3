import express, { urlencoded } from 'express'
import cors from 'cors'
import logger from '@configs/log/log.config'
import '@configs/auth/auth.config'
import path from 'path'
import cookieParser from 'cookie-parser'
import GlobalExceptionMiddleware from '@middlewares/global-exception.middleware'
import { categoryRouter } from './routers/category.router'
import { orchidRouter } from './routers/orchid.router'
import { userRouter } from './routers/user.router'
import { accountRouter } from './routers/account.router'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  urlencoded({
    extended: true
  })
)
app.use(express.json())

app.use(cookieParser())

app.use(logger)

/* --- Routes --- */
app.use('/categories', categoryRouter)
app.use('/orchids', orchidRouter)
app.use('/users', userRouter)
app.use('/accounts', accountRouter)
/* --- End Routes --- */
app.use(GlobalExceptionMiddleware.handle)

export { app }
