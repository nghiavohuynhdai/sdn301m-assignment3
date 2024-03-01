import ResponseDto from '@data/response.dto'
import { CategoryDto } from './category.dto'

const API_ROUTE = `${import.meta.env.VITE_API_URL}/categories`

const getAllCategories = async () => {
  try {
    const response = await fetch(API_ROUTE, { credentials: 'include' })
    const responseDto: ResponseDto<CategoryDto[]> = await response.json()
    return responseDto.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export { getAllCategories }
