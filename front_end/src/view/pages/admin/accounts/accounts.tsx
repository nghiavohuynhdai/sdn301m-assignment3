import { useCallback, useEffect, useState } from 'react'
import { UserDto } from '@data/user/user.dto'
import { getAllAccounts } from '@data/account/account-api'

export default function Accounts() {
  const [accounts, setAccounts] = useState<UserDto[]>([])

  const getData = useCallback(async () => {
    const allAccounts = await getAllAccounts()
    setAccounts(allAccounts)
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
        {accounts.map((account, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{account.name}</td>
            <td>{account.yob}</td>
            <td>{account.isAdmin ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
