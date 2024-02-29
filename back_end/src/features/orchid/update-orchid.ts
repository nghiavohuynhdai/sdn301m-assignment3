import { kebabCase } from 'lodash'
import { Orchids } from '@src/models/orchids'
import { NotFoundException } from '@common/exceptions/not-found.exception'

export const updateOrchid = async (
  name: string,
  image: string,
  isNatural: boolean,
  origin: string,
  categoryId: string,
  slug: string
) => {
  const orchid = await Orchids.findOne({ slug: slug }).exec()
  if (!orchid) throw new NotFoundException('Orchid not found')

  slug = kebabCase(name)
  await Orchids.updateOne({ _id: orchid.id }, { name, image, isNatural, origin, category: categoryId, slug }).exec()
}
