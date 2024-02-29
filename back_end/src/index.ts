import 'reflect-metadata'
import '@configs/common/env.config'
import '@configs/common/ioc.config'
import { app } from './express'
import { createServer } from 'http'
import { host, port } from '@configs/server/server.config'
import MongoDbConnection from '@database/connection'

MongoDbConnection.connect()
const server = createServer(app)

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`)
})
