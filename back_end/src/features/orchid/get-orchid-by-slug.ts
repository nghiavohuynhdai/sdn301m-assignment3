import { Orchids } from '@src/models/orchids'

export const getOrchidBySlug = async (slug: string) => {
  const orchid = await Orchids.findOne({ slug: slug }, {}, { populate: ['category', 'comments.author'] })
    .lean()
    .exec()
  return orchid
}
