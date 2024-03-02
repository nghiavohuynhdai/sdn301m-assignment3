import { CommentDto } from '@data/orchid/comment/comment.dto'
import OrchidComment from './orchid-comment'

interface OrchidCommentListProps {
  comments: CommentDto[]
}

export default function OrchidCommentList({ comments }: OrchidCommentListProps) {
  return (
    <div className='box'>
      {comments.map((comment, index) => (
        <OrchidComment key={index} comment={comment} />
      ))}
    </div>
  )
}
