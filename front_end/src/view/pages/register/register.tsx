import { registerUser } from '@data/user/user-api'
import { AppContext } from '@view/context/app-context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from '@view/assets/styles/register/register.module.scss'

export default function Register() {
  const navigate = useNavigate()
  const { isLogin } = useContext(AppContext)

  useEffect(() => {
    if (isLogin) {
      navigate('/')
    }
  }, [isLogin, navigate])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      name: { value: string }
      yob: { value: number }
      username: { value: string }
      password: { value: string }
    }

    const result = await registerUser(target.name.value, target.yob.value, target.username.value, target.password.value)

    if (typeof result === 'string') {
      toast.error(result)
    } else {
      toast.success('Registered successfully')
      navigate('/')
    }
  }

  return (
    <div className={`${styles.register} columns is-mobile is-centered is-vcentered`}>
      <div className='column box is-one-quarter'>
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <label className='label'>Name</label>
            <div className='control'>
              <input className='input' type='text' name='name' placeholder='Name' required />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Year of birth</label>
            <div className='control'>
              <input
                className='input'
                type='number'
                name='yob'
                min={new Date(Date.now()).getFullYear() - 100}
                max={new Date(Date.now()).getFullYear()}
                placeholder='2000'
                required
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Username</label>
            <div className='control'>
              <input className='input' type='text' name='username' placeholder='Username' required />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Password</label>
            <div className='control'>
              <input className='input' type='password' name='password' placeholder='Password' required />
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <button className='button is-link' type='submit'>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
