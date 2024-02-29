import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    yob: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const Users = model('users', userSchema)
