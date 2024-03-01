import { CategoryDto } from '@data/category/category.dto'
import { CommentDto } from '@data/comment/comment.dto'

interface OrchidDto {
  slug: string
  name: string
  image: string
  category: {
    name: string
  }
}

interface OrchidDetailsDto {
  slug: string
  name: string
  image: string
  isNature: boolean
  origin: string
  comments: CommentDto[]
  category: CategoryDto
}

export type { OrchidDto, OrchidDetailsDto }
