import routes from '@view/routers/routes'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <a className='navbar-item' href={routes.home.path}>
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
          <Link className='navbar-item' to={routes.home.path}>
            Home
          </Link>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <a className='button is-primary'>
                <strong>Sign up</strong>
              </a>
              <a className='button is-light'>Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
