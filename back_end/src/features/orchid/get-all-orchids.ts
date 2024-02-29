import { Orchids } from '@src/models/orchids'

export const getAllOrchids = async (filter: { name: string } | null) => {
  const { default: escapeStringRegexp } = await import('escape-string-regexp')

  const orchids = await Orchids.find(
    filter
      ? {
          name: { $regex: escapeStringRegexp(filter.name), $options: 'i' }
        }
      : {},
    {},
    { populate: 'category' }
  )
    .lean()
    .exec()
  return orchids
}
