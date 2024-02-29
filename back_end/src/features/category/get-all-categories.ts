import { Categories } from '@src/models/categories'

export const getAllCategories = async () => {
  const categories = await Categories.find({ isDeleted: false }, '-isDeleted').lean().exec()
  return categories
}
