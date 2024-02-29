import { NotFoundException } from '@common/exceptions/not-found.exception'
import { Categories } from '@src/models/categories'

export const deleteCategory = async (id: string) => {
  const category = await Categories.findById(id).exec()
  if (!category) throw new NotFoundException('Category not found')
  await Categories.updateOne({ _id: id }, { isDeleted: true }).exec()
}
