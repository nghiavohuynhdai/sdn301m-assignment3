import { BadRequestException } from '@common/exceptions/bad-request.exception'
import { NotFoundException } from '@common/exceptions/not-found.exception'
import { Orchids } from '@src/models/orchids'

export const createComment = async (orchidSlug: string, rating: number, comment: string, userId: string) => {
  const orchid = await Orchids.findOne({ slug: orchidSlug })
  if (!orchid) throw new NotFoundException('Orchid not found')
  const commentIndex = orchid.comments.findIndex((c) => c.author.toString() === userId)
  if (commentIndex !== -1) throw new BadRequestException('You already commented')
  orchid.comments.push({ rating, comment, author: userId })
  orchid.save()
}
