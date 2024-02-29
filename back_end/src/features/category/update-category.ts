import { NotFoundException } from '@common/exceptions/not-found.exception'
import { Categories } from '@src/models/categories'

export const updateCategory = async (id: string, name: string) => {
  const category = await Categories.findById(id).exec()
  if (!category) throw new NotFoundException('Category not found')
  await Categories.updateOne({ _id: id }, { name }).exec()
}
