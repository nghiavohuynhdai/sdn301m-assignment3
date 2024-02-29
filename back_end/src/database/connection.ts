import { connectOptions, connectionString } from '@configs/database/database.config'
import mongoose, { ConnectOptions } from 'mongoose'

export default class MongoDbConnection {
  public static async connect() {
    try {
      await mongoose.connect(connectionString, connectOptions)
      console.log('MongoDb connected successfully')
    } catch (error) {
      console.log(error)
    }
  }
}
