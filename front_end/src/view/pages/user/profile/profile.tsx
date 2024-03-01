import PrivateContainer from '@view/components/private-container'
import styles from '@view/assets/styles/profile/profile.module.scss'
import UserInfo from './components/user-info'
import { AppContext } from '@view/context/app-context'
import { useContext } from 'react'
import ChangePasswordForm from './components/change-password-form'

export default function Profile() {
  const { user } = useContext(AppContext)
  return (
    <PrivateContainer>
      <div className={`${styles.profile} columns is-mobile is-centered`}>
        <div className='column is-half'>
          <div className='column box is-full'>
            <UserInfo user={user!} />
          </div>
          <div className='column box is-full'>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </PrivateContainer>
  )
}
