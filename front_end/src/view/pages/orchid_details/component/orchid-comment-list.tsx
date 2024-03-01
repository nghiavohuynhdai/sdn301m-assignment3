import { CommentDto } from '@data/comment/comment.dto'
import OrchidComment from './orchid-comment'

interface OrchidCommentListProps {
  comments: CommentDto[]
}

export default function OrchidCommentList({ comments }: OrchidCommentListProps) {
  return comments.map((comment, index) => <OrchidComment key={index} comment={comment} />)
}
