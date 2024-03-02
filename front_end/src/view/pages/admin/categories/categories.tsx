import { getAllCategories } from '@data/category/category-api'
import { CategoryDto } from '@data/category/category.dto'
import { useCallback, useEffect, useState } from 'react'
import CreateCategoryModal from './components/create-category-modal'
import UpdateCategoryModal from './components/update-category-modal'
import DeleteCategoryModal from './components/delete-category-modal'

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

  const handleCreateSuccess = async () => {
    setCreateCategoryModal(false)
    getData()
  }

  const handleUpdateSuccess = async () => {
    setSelectedCategory(null)
    setUpdateCategoryModal(false)
    getData()
  }

  const handleDeleteSuccess = async () => {
    setSelectedCategory(null)
    setDeleteCategoryModal(false)
    getData()
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
                <div className='buttons'>
                  <button className='button is-primary' onClick={() => handleEditButton(category)}>
                    Edit
                  </button>
                  <button className='button is-danger' onClick={() => handleDeleteButton(category)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateCategoryModal
        isOpen={createCategoryModal}
        onClose={() => setCreateCategoryModal(false)}
        onSuccess={handleCreateSuccess}
      />
      {selectedCategory && (
        <UpdateCategoryModal
          isOpen={updateCategoryModal}
          onClose={() => setUpdateCategoryModal(false)}
          onSuccess={handleUpdateSuccess}
          category={selectedCategory}
        />
      )}
      {selectedCategory && (
        <DeleteCategoryModal
          isOpen={deleteCategoryModal}
          onClose={() => setDeleteCategoryModal(false)}
          onSuccess={handleDeleteSuccess}
          category={selectedCategory}
        />
      )}
    </>
  )
}
