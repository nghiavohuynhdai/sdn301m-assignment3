import { changeUserPassword } from '@data/user/user-api'
import { toast } from 'react-toastify'

export default function ChangePasswordForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      currentPassword: { value: string }
      newPassword: { value: string }
    }

    const changeResult = await changeUserPassword(target.currentPassword.value, target.newPassword.value)

    if (typeof changeResult === 'string') {
      toast.error(changeResult)
    } else {
      toast.success('Password changed')
      target.currentPassword.value = ''
      target.newPassword.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='field'>
        <label className='label'>Current password</label>
        <div className='control'>
          <input className='input' type='password' name='currentPassword' placeholder='Current password' required />
        </div>
      </div>
      <div className='field'>
        <label className='label'>New password</label>
        <div className='control'>
          <input className='input' type='password' name='newPassword' placeholder='New password' required />
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <button className='button is-link' type='submit'>
            Change
          </button>
        </div>
      </div>
    </form>
  )
}
