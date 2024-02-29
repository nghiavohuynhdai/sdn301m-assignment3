import { NotFoundException } from '@common/exceptions/not-found.exception'
import { Orchids } from '@src/models/orchids'

export const deleteOrchid = async (slug: string) => {
  const orchid = await Orchids.findOne({ slug: slug }).exec()
  if (!orchid) throw new NotFoundException('Orchid not found')
  await Orchids.deleteOne({ _id: orchid.id }).exec()
}
