import { getAllCategories } from '@data/category/category-api'
import { CategoryDto } from '@data/category/category.dto'
import { updateOrchid } from '@data/orchid/orchid-api'
import { OrchidDetailsDto } from '@data/orchid/orchid.dto'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface UpdateOrchidFormProps {
  orchid: OrchidDetailsDto
  onSuccess: () => void
}
export default function UpdateOrchidForm({ orchid, onSuccess }: UpdateOrchidFormProps) {
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

    const createResult = await updateOrchid(
      orchid.slug,
      target.name.value,
      target.image.value,
      target.isNatural.checked,
      target.origin.value,
      target.categoryId.value
    )

    if (typeof createResult === 'string') {
      toast.error(createResult)
    } else {
      toast.success('Orchid updated')
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='field'>
        <label className='label'>Name</label>
        <div className='control'>
          <input className='input' type='text' name='name' placeholder='Name' defaultValue={orchid.name} required />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Image</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='image'
            placeholder='Image url'
            defaultValue={orchid.image}
            required
          />
        </div>
      </div>
      <div className='field'>
        <label className='checkbox'>
          <input type='checkbox' name='isNatural' defaultChecked={orchid.isNature} /> Is natural
        </label>
      </div>
      <div className='field'>
        <label className='label'>Origin</label>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='origin'
            placeholder='Origin'
            defaultValue={orchid.origin}
            required
          />
        </div>
      </div>
      <div className='field'>
        <div className='select'>
          <select name='categoryId'>
            <option value=''>Select category</option>
            {categories.map((category) => (
              <option key={category.name} value={category._id} selected={category._id === orchid.category?._id}>
                {category.name}
              </option>
            ))}
          </select>
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
