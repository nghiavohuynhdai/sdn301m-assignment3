import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const MIN_RATING = 1
const MAX_RATING = 5

interface OrchidCommentInputProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function OrchidCommentInput({ onSubmit }: OrchidCommentInputProps) {
  const [rating, setRating] = useState(0)

  return (
    <article className='media'>
      <div className='media-content'>
        <form onSubmit={onSubmit}>
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
              <input hidden type='number' name='rating' min={MIN_RATING} max={MAX_RATING} value={rating} readOnly />
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
