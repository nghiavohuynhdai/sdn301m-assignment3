import { RouterProvider } from 'react-router-dom'
import './assets/styles/app.scss'
import router from './routers/router'
import { AppProvider } from './context/app-context'

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}
