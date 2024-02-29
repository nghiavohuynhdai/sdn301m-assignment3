import { Schema, model } from 'mongoose'

const categorySchema = new Schema(
  {
    name: { type: String, isRequired: true, unique: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const Categories = model('categories', categorySchema)
