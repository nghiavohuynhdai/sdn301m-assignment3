import { Categories } from '@src/models/categories'

export const getAllCategories = async () => {
  const categories = await Categories.find({ isDeleted: false }, '-isDeleted').sort({ createdAt: -1 }).lean().exec()
  return categories
}
