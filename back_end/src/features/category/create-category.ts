import { BadRequestException } from '@common/exceptions/bad-request.exception'
import { Categories } from '@src/models/categories'

export const createCategory = async (name: string) => {
  let category = await Categories.findOne({ name: name }).exec()
  if (category) throw new BadRequestException('Category name exits')
  category = new Categories({ name })
  await category.save()
}
