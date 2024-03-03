import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { toast } from 'react-toastify'

const MIN_RATING = 1
const MAX_RATING = 5

interface OrchidCommentInputProps {
  postComment: (rating: number, comment: string) => void
}

export default function OrchidCommentInput({ postComment }: OrchidCommentInputProps) {
  const [rating, setRating] = useState(0)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      rating: { value: number }
      comment: { value: string }
    }
    if (rating < MIN_RATING) {
      toast.error(`Rating must be at least ${MIN_RATING} star`)
      return
    }
    postComment(target.rating.value, target.comment.value)
  }

  return (
    <article className='media'>
      <div className='media-content'>
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <div className='control'>
              {Array.from({ length: rating }).map((_, index) => (
                <a key={index + 1} onClick={() => setRating(index + 1)}>
                  <FontAwesomeIcon icon={faStar} style={{ color: '#FFD43B' }} />
                </a>
              ))}
              {Array.from({ length: MAX_RATING - rating }).map((_, index) => (
                <a key={rating + index + 1} onClick={() => setRating(rating + index + 1)}>
                  <FontAwesomeIcon icon={faStar} style={{ color: '#C4C6D1' }} />
                </a>
              ))}
              <input hidden type='number' name='rating' value={rating} readOnly />
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <textarea name='comment' className='textarea' placeholder='Add a comment...' required maxLength={100} />
            </div>
          </div>
          <button className='button is-info'>Post</button>
        </form>
      </div>
    </article>
  )
}
