import UpdateOrchidForm from './update-category-form'
import { CategoryDto } from '@data/category/category.dto'

interface UpdateCategoryModalProps {
  category: CategoryDto
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function UpdateCategoryModal({ category, isOpen, onClose, onSuccess }: UpdateCategoryModalProps) {
  return (
    <div className={`modal ${isOpen && 'is-active'}`}>
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-content'>
        <div className='box'>
          <h3 className='title is-3'>Update Orchid</h3>
          {category && <UpdateOrchidForm category={category} onSuccess={onSuccess} />}
        </div>
      </div>
    </div>
  )
}
