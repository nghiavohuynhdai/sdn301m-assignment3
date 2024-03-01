import { getAllCategories } from '@data/category/category-api'
import { CategoryDto } from '@data/category/category.dto'
import { createOrchid } from '@data/orchid/orchid-api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface CreateOrchidFormProps {
  onSuccess: () => void
}

export default function CreateOrchidForm({ onSuccess }: CreateOrchidFormProps) {
  const [categories, setCategories] = useState<CategoryDto[]>([])

  useEffect(() => {
    const getData = async () => {
      const categories = await getAllCategories()
      setCategories(categories)
    }

    getData()
    return () => {}
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      name: { value: string }
      image: { value: string }
      isNatural: { checked: boolean }
      origin: { value: string }
      categoryId: { value: string }
    }

    const createResult = await createOrchid(
      target.name.value,
      target.image.value,
      target.isNatural.checked,
      target.origin.value,
      target.categoryId.value
    )

    if (typeof createResult === 'string') {
      toast.error(createResult)
    } else {
      toast.success('Orchid created')
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
        <label className='label'>Image</label>
        <div className='control'>
          <input className='input' type='text' name='image' placeholder='Image url' required />
        </div>
      </div>
      <div className='field'>
        <label className='checkbox'>
          <input type='checkbox' name='isNatural' /> Is natural
        </label>
      </div>
      <div className='field'>
        <label className='label'>Origin</label>
        <div className='control'>
          <input className='input' type='text' name='origin' placeholder='Origin' required />
        </div>
      </div>
      <div className='field'>
        <div className='select'>
          <select name='categoryId'>
            <option value=''>Select category</option>
            {categories.map((category) => (
              <option key={category.name} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
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
