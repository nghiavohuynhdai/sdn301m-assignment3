import { loginUser } from '@data/user/user-api'
import styles from '@view/assets/styles/login/login.module.scss'
import { AppContext } from '@view/context/app-context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {
  const navigate = useNavigate()
  const { isLogin, login } = useContext(AppContext)

  useEffect(() => {
    if (isLogin) {
      navigate('/')
    }
  }, [isLogin, navigate])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      username: { value: string }
      password: { value: string }
    }

    const result = await loginUser(target.username.value, target.password.value)

    if (typeof result === 'string') {
      toast.error(result)
    } else {
      login && login()
      navigate('/')
    }
  }

  return (
    <div className={`${styles.login} columns is-mobile is-centered is-vcentered`}>
      <div className='column box is-one-quarter'>
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <label className='label'>Username</label>
            <div className='control'>
              <input className='input' type='text' name='username' placeholder='Username' required />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Password</label>
            <div className='control'>
              <input className='input' type='password' placeholder='Password' name='password' required />
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <button className='button is-link' type='submit'>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
