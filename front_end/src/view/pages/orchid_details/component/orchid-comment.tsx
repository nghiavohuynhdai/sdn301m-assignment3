import { CommentDto } from '@data/comment/comment.dto'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface OrchidCommentProps {
  comment: CommentDto
}

export default function OrchidComment({ comment }: OrchidCommentProps) {
  return (
    <article className='media'>
      <div className='media-content'>
        <div className='content'>
          <p>
            <strong>{comment.author.name}</strong>
            {/* stars rating */}
            <FontAwesomeIcon icon={faStar} style={{ color: '#FFD43B' }} />
            <br />
            {comment.comment}
            <br />
            <small>{comment.createdAt.toDateString()}</small>
          </p>
        </div>
      </div>
    </article>
  )
}
