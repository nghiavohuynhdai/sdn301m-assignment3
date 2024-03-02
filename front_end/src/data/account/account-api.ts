import ResponseDto from '@data/response.dto'
import { UserDto } from '@data/user/user.dto'

const API_ROUTE = `${import.meta.env.VITE_API_URL}/accounts`

const getAllAccounts = async () => {
  try {
    const response = await fetch(API_ROUTE, { credentials: 'include' })
    const responseDto: ResponseDto<UserDto[]> = await response.json()
    return responseDto.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export { getAllAccounts }
