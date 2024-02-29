import ResponseDto from '../response.dto'
import { OrchidDetailsDto, OrchidDto } from './orchid.dto'

const API_URL = import.meta.env.VITE_API_URL

const getAllOrchids = async (search?: string): Promise<OrchidDto[]> => {
  try {
    const response = await fetch(`${API_URL}/orchids${search ? '?name=' + search : ''}`)
    const responseDto: ResponseDto<OrchidDto[]> = await response.json()
    return responseDto.data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getOrchidDetails = async (slug: string): Promise<OrchidDetailsDto | null> => {
  try {
    const response = await fetch(`${API_URL}/orchids/${slug}`)
    const responseDto: ResponseDto<OrchidDetailsDto> = await response.json()
    return responseDto.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getAllOrchids, getOrchidDetails }
