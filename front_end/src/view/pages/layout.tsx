import Footer from '@view/components/footer'
import Navbar from '@view/components/navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <div className='container is-fluid'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
