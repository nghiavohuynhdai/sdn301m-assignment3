import { UserDto } from "@data/user/user.dto"

interface CommentDto {
    rating: number
    comment: string
    author: UserDto
    createdAt: string
}

export type { CommentDto }
