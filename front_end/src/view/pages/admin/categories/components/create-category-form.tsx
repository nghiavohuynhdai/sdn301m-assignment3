import { createCategory } from '@data/category/category-api'
import { toast } from 'react-toastify'

interface CreateCategoryFormProps {
  onSuccess: () => void
}

export default function CreateCategoryForm({ onSuccess }: CreateCategoryFormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      name: { value: string }
    }

    const createResult = await createCategory(target.name.value)

    if (typeof createResult === 'string') {
      toast.error(createResult)
    } else {
      toast.success('Category created')
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='field'>
        <label className='label'>Name</label>
        <div className='control'>
          <input className='input' type='text' name='name' placeholder='Name' required />
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <button className='button is-link' type='submit'>
            Create
          </button>
        </div>
      </div>
    </form>
  )
}
