import PrivateContainer from '@view/components/private-container'
import { AppContext } from '@view/context/app-context'
import { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

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
    name: 'Accounts',
    path: '/admin/accounts'
  }
]

const getCurrentTab = (path: string) => {
  const tab = tabs.find((tab) => path === tab.path)
  return tab ? tab.name : tabs[0].name
}

export default function AdminLayout() {
  const { user } = useContext(AppContext)
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState(getCurrentTab(location.pathname))
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
