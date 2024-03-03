import { logoutUser } from '@data/user/user-api'
import { AppContext } from '@view/context/app-context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Navbar() {
  const { isLogin, user, logout } = useContext(AppContext)

  const handleLogout = async () => {
    const logoutResult = await logoutUser()
    if (typeof logoutResult === 'string') {
      toast.error(logoutResult)
    } else {
      logout && logout()
    }
  }

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='/'>
          <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28' />
        </a>

        <a
          role='button'
          className='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          <Link className='navbar-item' to='/'>
            Home
          </Link>
          {isLogin && user!.isAdmin && (
            <Link className='navbar-item' to='/admin/orchids'>
              Admin
            </Link>
          )}
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              {isLogin ? (
                <>
                  <Link className='button is-primary' to='/profile'>
                    <strong>Profile</strong>
                  </Link>
                  <Link className='button is-light' to='/' onClick={handleLogout}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link className='button is-primary' to='register'>
                    <strong>Sign up</strong>
                  </Link>
                  <Link className='button is-light' to='/login'>
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
