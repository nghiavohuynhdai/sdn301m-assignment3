import { createBrowserRouter } from 'react-router-dom'
import Layout from '@view/pages/layout'
import Home from '@view/pages/home/home'
import OrchidDetails from '@view/pages/orchid_details/orchid-details'
import Login from '@view/pages/login/login'
import Register from '@view/pages/register/register'
import Profile from '@view/pages/user/profile/profile'
import Orchids from '@view/pages/admin/orchids/orchids'
import AdminLayout from '@view/pages/admin/admin-layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'orchids/:slug', element: <OrchidDetails /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <Profile /> },
      {
        path: 'admin/',
        element: <AdminLayout />,
        children: [
          { path: 'orchids', element: <Orchids /> },
          { path: 'categories', element: <div>Categories</div> },
          { path: 'users', element: <div>Users</div> }
        ]
      }
    ]
  }
])

export default router
