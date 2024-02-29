import { Categories } from '@src/models/categories'

export const getCategoryById = async (id: string) => {
  const category = await Categories.findOne({ _id: id, isDeleted: false }, '-isDeleted').lean().exec()
  return category
}
