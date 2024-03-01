import { getAllCategories } from '@data/category/category-api'
import { CategoryDto } from '@data/category/category.dto'
import { useCallback, useEffect, useState } from 'react'

export default function Categories() {
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [createCategoryModal, setCreateCategoryModal] = useState(false)
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null)
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)

  const getData = useCallback(async () => {
    const allCategories = await getAllCategories()
    setCategories(allCategories)
  }, [])

  useEffect(() => {
    getData()
    return () => {}
  }, [getData])

  const handleEditButton = (category: CategoryDto) => {
    setSelectedCategory(category)
    setUpdateCategoryModal(true)
  }

  const handleDeleteButton = (category: CategoryDto) => {
    setSelectedCategory(category)
    setDeleteCategoryModal(true)
  }

  return (
    <>
      <button className='button is-primary' onClick={() => setCreateCategoryModal(true)}>
        Create
      </button>
      <table className='table is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>
                <button className='button is-info'>View</button>
                <button className='button is-primary' onClick={() => handleEditButton(category)}>
                  Edit
                </button>
                <button className='button is-danger' onClick={() => handleDeleteButton(category)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
