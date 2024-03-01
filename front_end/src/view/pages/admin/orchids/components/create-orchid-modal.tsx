import CreateOrchidForm from './create-orchid-form'

interface CreateOrchidModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function CreateOrchidModal({ isOpen, onClose, onSuccess }: CreateOrchidModalProps) {
  return (
    <div className={`modal ${isOpen && 'is-active'}`}>
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-content'>
        <div className='box'>
          <h3 className='title is-3'>Create Orchid</h3>
          <CreateOrchidForm onSuccess={onSuccess}/>
        </div>
      </div>
    </div>
  )
}
