import mongoose, { Schema } from 'mongoose'
import { commentSchema } from './comments'

const orchidSchema = new Schema(
  {
    name: { type: String, isRequired: true },
    slug: { type: String, isRequired: true },
    image: { type: String, isRequired: true },
    isNatural: { type: Boolean, default: false },
    origin: { type: String, isRequired: true },
    comments: [commentSchema],
    category: { type: Schema.Types.ObjectId, ref: 'categories', required: true }
  },
  { timestamps: true }
)

export const Orchids = mongoose.model('orchids', orchidSchema)
