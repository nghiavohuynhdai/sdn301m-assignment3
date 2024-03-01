import { getOrchidDetails } from '@data/orchid/orchid-api'
import { OrchidDetailsDto } from '@data/orchid/orchid.dto'
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
          {orchid && ''}
        </div>
      </div>
    </div>
  )
}
