import { getOrchidDetails } from '@data/orchid/orchid-api'
import { OrchidDetailsDto } from '@data/orchid/orchid.dto'
import OrchidCommentList from '@view/components/orchid-comment-list'
import { useEffect, useState } from 'react'

interface ViewOrchidModalProps {
  orchidSlug: string
  isOpen: boolean
  onClose: () => void
}

export default function ViewOrchidModal({ orchidSlug, isOpen, onClose }: ViewOrchidModalProps) {
  const [orchid, setOrchid] = useState<OrchidDetailsDto | null>(null)

  useEffect(() => {
    const getData = async () => {
      const orchidDetails = await getOrchidDetails(orchidSlug)
      setOrchid(orchidDetails)
    }
    getData()
    return () => {}
  }, [orchidSlug])

  return (
    <div className={`modal ${isOpen && 'is-active'}`}>
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-content'>
        <div className='box'>
          <h3 className='title is-3'>Orchid Details</h3>
          {orchid && (
            <>
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
                </div>
              </div>
              <h4 className='subtitle is-4'>Comment</h4>
              {orchid.comments.length !== 0 && <OrchidCommentList comments={orchid.comments} />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
