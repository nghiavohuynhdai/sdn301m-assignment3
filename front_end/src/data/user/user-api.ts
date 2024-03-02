import ResponseDto from '@data/response.dto'
import { UserDto } from './user.dto'

const API_ROUTE = `${import.meta.env.VITE_API_URL}/users`

const getAllUsers = async () => {
  try {
    const response = await fetch(API_ROUTE, { credentials: 'include' })
    const responseDto: ResponseDto<UserDto[]> = await response.json()
    return responseDto.data
  } catch (error) {
    console.log(error)
    return []
  }
}

const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_ROUTE}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const responseDto: ResponseDto<{ success: boolean }> = await response.json()
    if (response.status === 400) return responseDto.message
    return true
  } catch (error) {
    console.log(error)
    return 'Server error'
  }
}

const logoutUser = async () => {
  try {
    const response = await fetch(`${API_ROUTE}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    const responseDto: ResponseDto<{ success: boolean }> = await response.json()
    if (response.status === 400) return responseDto.message
    return true
  } catch (error) {
    console.log(error)
    return 'Server error'
  }
}

const registerUser = async (name: string, yob: number, username: string, password: string) => {
  try {
    const response = await fetch(`${API_ROUTE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, yob, username, password })
    })
    const responseDto: ResponseDto<{ success: boolean }> = await response.json()
    if (response.status === 400) return responseDto.message
    return true
  } catch (error) {
    console.log(error)
    return 'Server error'
  }
}

const getUserProfile = async () => {
  try {
    const response = await fetch(`${API_ROUTE}/profile`, {
      credentials: 'include'
    })
    const responseDto: ResponseDto<UserDto> = await response.json()
    if (response.status !== 200) return null
    return responseDto.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const updateUserProfile = async (name: string, yob: number) => {
  try {
    const response = await fetch(`${API_ROUTE}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, yob }),
      credentials: 'include'
    })
    const responseDto: ResponseDto<{ success: boolean }> = await response.json()
    if (response.status !== 200) return responseDto.message
    return true
  } catch (error) {
    console.log(error)
    return 'Server error'
  }
}

const changeUserPassword = async (currentPassword: string, newPassword: string) => {
  try {
    const response = await fetch(`${API_ROUTE}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
      credentials: 'include'
    })
    const responseDto: ResponseDto<{ success: boolean }> = await response.json()
    if (response.status !== 200) return responseDto.message
    return true
  } catch (error) {
    console.log(error)
    return 'Server error'
  }
}

export { getAllUsers, loginUser, logoutUser, registerUser, getUserProfile, updateUserProfile, changeUserPassword }
