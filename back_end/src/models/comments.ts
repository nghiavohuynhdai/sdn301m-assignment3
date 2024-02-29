import { Schema } from 'mongoose'

export const commentSchema = new Schema(
  {
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'users', required: true }
  },
  { timestamps: true }
)
