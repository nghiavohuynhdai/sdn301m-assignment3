import { ConnectOptions } from 'mongoose'

const connectionString = process.env.MONGODB_CONNECTION_STRING || ''
const connectOptions: ConnectOptions = {}

export { connectionString, connectOptions }
