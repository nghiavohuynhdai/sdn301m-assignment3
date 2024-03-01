import PrivateContainer from '@view/components/private-container'
import { AppContext } from '@view/context/app-context'
import { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const tabs = [
  {
    name: 'Orchids',
    path: '/admin/orchids'
  },
  {
    name: 'Categories',
    path: '/admin/categories'
  },
  {
    name: 'Users',
    path: '/admin/users'
  }
]
export default function AdminLayout() {
  const { user } = useContext(AppContext)
  const [selectedTab, setSelectedTab] = useState(tabs[0].name)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <PrivateContainer>
      <div className='tabs'>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.name} className={selectedTab === tab.name ? 'is-active' : ''}>
              <Link to={tab.path} onClick={() => setSelectedTab(tab.name)}>
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </PrivateContainer>
  )
}
