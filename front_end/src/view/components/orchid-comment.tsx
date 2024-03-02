import { CommentDto } from '@data/orchid/comment/comment.dto'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface OrchidCommentProps {
  comment: CommentDto
}

export default function OrchidComment({ comment }: OrchidCommentProps) {
  const calculateTimeFromCommentPosted = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date(Date.now())

    const yearDiff = now.getFullYear() - date.getFullYear()
    if (yearDiff > 0) {
      if (yearDiff === 1) {
        return '1 year ago'
      }
      return `${yearDiff} years ago`
    }

    const monthDiff = now.getMonth() - date.getMonth()
    if (monthDiff > 0) {
      if (monthDiff === 1) {
        return '1 month ago'
      }
      return `${monthDiff} months ago`
    }

    const dayDiff = now.getDay() - date.getDay()
    if (dayDiff > 0) {
      if (dayDiff === 1) {
        return 'yesterday'
      }
      return `${dayDiff} days ago`
    }

    const hourDiff = now.getHours() - date.getHours()
    if (hourDiff > 0) {
      if (hourDiff === 1) {
        return '1 hour ago'
      }
      return `${hourDiff} hours ago`
    }

    const minuteDiff = now.getMinutes() - date.getMinutes()
    if (minuteDiff > 0) {
      if (minuteDiff === 1) {
        return '1 minute ago'
      }
      return `${minuteDiff} minutes ago`
    }

    const secondDiff = now.getSeconds() - date.getSeconds()
    if (secondDiff > 0) {
      if (secondDiff === 1) {
        return '1 second ago'
      }
      return `${secondDiff} seconds ago`
    }

    return 'just now'
  }

  return (
    <article className='media'>
      <div className='media-content'>
        <div className='content'>
          <p>
            <strong>{comment.author.name}</strong>
            <br />
            {Array.from({ length: comment.rating }).map((_, index) => (
              <FontAwesomeIcon key={index} icon={faStar} style={{ color: '#FFD43B' }} />
            ))}
          </p>
          <p>
            {comment.comment}
            <br />
            <small>{calculateTimeFromCommentPosted(comment.createdAt)}</small>
          </p>
        </div>
      </div>
    </article>
  )
}
