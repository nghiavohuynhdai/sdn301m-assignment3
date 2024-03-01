import { UserDto } from "@data/user/user.dto"

interface CommentDto {
    rating: number
    comment: string
    author: UserDto
    createdAt: Date
}

export type { CommentDto }
