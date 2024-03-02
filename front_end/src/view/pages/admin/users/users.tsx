import { useCallback, useEffect, useState } from 'react'
import { UserDto } from '@data/user/user.dto'
import { getAllUsers } from '@data/user/user-api'

export default function Users() {
  const [users, setUsers] = useState<UserDto[]>([])

  const getData = useCallback(async () => {
    const allUsers = await getAllUsers()
    setUsers(allUsers)
  }, [])

  useEffect(() => {
    getData()
    return () => {}
  }, [getData])

  return (
    <table className='table is-fullwidth'>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Year of birth</th>
          <th>Is admin</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.yob}</td>
            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
