import { updateUserProfile } from '@data/user/user-api'
import { UserDto } from '@data/user/user.dto'
import { toast } from 'react-toastify'

interface UserInfoProps {
  user: UserDto
}

export default function UserInfo({ user }: UserInfoProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      name: { value: string }
      yob: { value: number }
    }

    const updateResult = await updateUserProfile(target.name.value, target.yob.value)

    if (typeof updateResult === 'string') {
      toast.error(updateResult)
    } else {
      toast.success('Profile updated')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='field'>
        <label className='label'>Name</label>
        <div className='control'>
          <input className='input' type='text' name='name' placeholder='Name' defaultValue={user.name} required />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Year of birth</label>
        <div className='control'>
          <input
            className='input'
            type='number'
            name='yob'
            defaultValue={user.yob}
            min={new Date(Date.now()).getFullYear() - 100}
            max={new Date(Date.now()).getFullYear()}
            placeholder='2000'
            required
          />
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <button className='button is-link' type='submit'>
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
