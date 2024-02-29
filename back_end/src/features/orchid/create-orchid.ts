import { kebabCase } from 'lodash'
import { Orchids } from '@src/models/orchids'
import { BadRequestException } from '@common/exceptions/bad-request.exception'

export const createOrchid = async (
  name: string,
  image: string,
  isNatural: boolean,
  origin: string,
  categoryId: string
) => {
  let orchid = await Orchids.findOne({ name: name }).exec()
  if (orchid) throw new BadRequestException('Orchid name exits')
  const slug = kebabCase(name)
  orchid = new Orchids({ name, image, isNatural, origin, slug, category: categoryId, comment: [] })
  await orchid.save()
}
