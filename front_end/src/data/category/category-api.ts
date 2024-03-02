import ResponseDto from '@data/response.dto'
import { CategoryDto } from './category.dto'

const API_ROUTE = `${import.meta.env.VITE_API_URL}/categories`

const getAllCategories = async () => {
  try {
    const response = await fetch(API_ROUTE, { credentials: 'include' })
    const responseDto: ResponseDto<CategoryDto[]> = await response.json()
    return responseDto.data
  } catch (error) {
    console.log(error)
    return []
  }
}

const createCategory = async (name: string) => {
  try {
    const response = await fetch(API_ROUTE, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
    const responseDto: ResponseDto<unknown> = await response.json()
    if (responseDto.status !== 201) {
      return responseDto.message
    }
    return true
  } catch (error) {
    console.log(error)
    return 'Server error'
  }
}

const updateCategory = async (id: string, name: string) => {
  try {
    const response = await fetch(`${API_ROUTE}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
    const responseDto: ResponseDto<unknown> = await response.json()
    if (responseDto.status !== 200) {
      return responseDto.message
    }
    return true
  } catch (error) {
    console.log(error)
    return 'Server error'
  }
}

const deleteCategory = async (id: string) => {
  try {
    const response = await fetch(`${API_ROUTE}/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const responseDto: ResponseDto<unknown> = await response.json()
    if (responseDto.status !== 200) {
      return responseDto.message
    }
  } catch (error) {
    console.log(error)
    return 'Server error'
  }
}

export { getAllCategories, createCategory, updateCategory, deleteCategory }
