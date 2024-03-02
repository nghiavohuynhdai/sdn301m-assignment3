import { deleteCategory } from '@data/category/category-api'
import { CategoryDto } from '@data/category/category.dto'
import { toast } from 'react-toastify'

interface DeleteCategoryModalProps {
  category: CategoryDto
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function DeleteOrchidModal({ category, isOpen, onClose, onSuccess }: DeleteCategoryModalProps) {
  const handleDelete = async () => {
    const response = await deleteCategory(category._id)
    if (typeof response === 'string') {
      toast.error(response)
    } else {
      toast.success('Category deleted')
      onSuccess()
    }
  }

  return (
    <div className={`modal ${isOpen && 'is-active'}`}>
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-content'>
        <div className='box'>
          <h3 className='title is-3'>Delete Orchid</h3>
          <p>Are you sure you want to delete this category?</p>
          <br />
          <button className='button is-danger' onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
