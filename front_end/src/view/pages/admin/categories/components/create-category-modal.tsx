import CreateOrchidForm from './create-category-form'

interface CreateCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function CreateCategoryModal({ isOpen, onClose, onSuccess }: CreateCategoryModalProps) {
  return (
    <div className={`modal ${isOpen && 'is-active'}`}>
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-content'>
        <div className='box'>
          <h3 className='title is-3'>Create Category</h3>
          <CreateOrchidForm onSuccess={onSuccess}/>
        </div>
      </div>
    </div>
  )
}
