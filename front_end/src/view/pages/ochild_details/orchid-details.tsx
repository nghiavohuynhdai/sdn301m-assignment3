import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrchidDetails } from '@data/orchid/orchid-api'
import { OrchidDetailsDto } from '@data/orchid/orchid.dto'

export default function OrchidDetails() {
  const [orchid, setOrchid] = useState<OrchidDetailsDto | null>(null)
  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      getOrchidDetails(slug).then((data) => {
        setOrchid(data)
      })
    }
    return () => {}
  }, [slug])

  return orchid ? (
    <div className='section'>
      <div className='columns'>
        <div className='column is-half'>
          <figure className='image is-4by3'>
            <img src={orchid.image} alt={orchid.name} />
          </figure>
        </div>
        <div className='column is-half'>
          <h1 className='title is-2'>{orchid.name}</h1>
          <h2 className='subtitle is-4'>{orchid.category?.name}</h2>
          <p>
            <strong>Origin:</strong> {orchid.origin}
          </p>
          <p>
            <strong>Nature:</strong> {orchid.isNature ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Comments:</strong>
          </p>
          <ul>
            {orchid.comments?.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null
}
