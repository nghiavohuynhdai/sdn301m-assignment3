import { updateCategory } from '@data/category/category-api'
import { CategoryDto } from '@data/category/category.dto'
import { toast } from 'react-toastify'

interface UpdateCategoryFormProps {
  category: CategoryDto
  onSuccess: () => void
}
export default function UpdateOrchidForm({ category, onSuccess }: UpdateCategoryFormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      name: { value: string }
    }

    const updateResult = await updateCategory(category._id, target.name.value)

    if (typeof updateResult === 'string') {
      toast.error(updateResult)
    } else {
      toast.success('Category updated')
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='field'>
        <label className='label'>Name</label>
        <div className='control'>
          <input className='input' type='text' name='name' placeholder='Name' defaultValue={category.name} required />
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <button className='button is-link' type='submit'>
            Update
          </button>
        </div>
      </div>
    </form>
  )
}
