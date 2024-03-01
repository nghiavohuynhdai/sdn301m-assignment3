import { deleteOrchid } from '@data/orchid/orchid-api'
import { toast } from 'react-toastify'

interface DeleteOrchidModalProps {
  orchidSlug: string
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function DeleteOrchidModal({ orchidSlug, isOpen, onClose, onSuccess }: DeleteOrchidModalProps) {
  const handleDelete = async () => {
    const response = await deleteOrchid(orchidSlug)
    if (typeof response === 'string') {
      toast.error(response)
    } else {
      toast.success('Orchid deleted')
      onSuccess()
    }
  }

  return (
    <div className={`modal ${isOpen && 'is-active'}`}>
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-content'>
        <div className='box'>
          <h3 className='title is-3'>Delete Orchid</h3>
          <p>Are you sure you want to delete this orchid?</p>
          <br />
          <button className='button is-danger' onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
