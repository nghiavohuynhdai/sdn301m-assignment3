import ResponseDto from '../response.dto'
import { OrchidDetailsDto, OrchidDto } from './orchid.dto'

const API_ROUTE = `${import.meta.env.VITE_API_URL}/orchids`

const getAllOrchids = async (search?: string): Promise<OrchidDto[]> => {
  try {
    const response = await fetch(`${API_ROUTE}${search ? '?name=' + search : ''}`)
    const responseDto: ResponseDto<OrchidDto[]> = await response.json()
    return responseDto.data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getOrchidDetails = async (slug: string): Promise<OrchidDetailsDto | null> => {
  try {
    const response = await fetch(`${API_ROUTE}/${slug}`)
    const responseDto: ResponseDto<OrchidDetailsDto> = await response.json()
    return responseDto.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const createOrchid = async (name: string, image: string, isNatural: boolean, origin: string, categoryId: string) => {
  try {
    const response = await fetch(API_ROUTE, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, image, isNatural, origin, categoryId })
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

const updateOrchid = async (
  slug: string,
  name: string,
  image: string,
  isNatural: boolean,
  origin: string,
  categoryId: string
) => {
  try {
    const response = await fetch(`${API_ROUTE}/${slug}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, image, isNatural, origin, categoryId })
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

const deleteOrchid = async (slug: string) => {
  try {
    const response = await fetch(`${API_ROUTE}/${slug}`, {
      method: 'DELETE',
      credentials: 'include'
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

export { getAllOrchids, getOrchidDetails, createOrchid, updateOrchid, deleteOrchid }
