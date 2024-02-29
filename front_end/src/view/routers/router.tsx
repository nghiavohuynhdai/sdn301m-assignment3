import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@view/pages/layout'
import Home from '@view/pages/home/home'
import routes from './routes'
import OrchidDetails from '@view/pages/ochild_details/orchid-details'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path={routes.home.path} element={<Home />} />
          <Route path={routes.orchidDetails.path} element={<OrchidDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
