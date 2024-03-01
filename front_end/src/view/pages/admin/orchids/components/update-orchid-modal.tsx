import { OrchidDetailsDto } from '@data/orchid/orchid.dto'
import UpdateOrchidForm from './update-orchid-form'
import { useEffect, useState } from 'react'
import { getOrchidDetails } from '@data/orchid/orchid-api'

interface UpdateOrchidModalProps {
  orchidSlug: string
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function UpdateOrchidModal({ orchidSlug, isOpen, onClose, onSuccess }: UpdateOrchidModalProps) {
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
      <div
        className='modal-background'
        onClick={onClose}
      ></div>
      <div className='modal-content'>
        <div className='box'>
          <h3 className='title is-3'>Update Orchid</h3>
          {orchid && <UpdateOrchidForm orchid={orchid} onSuccess={onSuccess} />}
        </div>
      </div>
    </div>
  )
}
