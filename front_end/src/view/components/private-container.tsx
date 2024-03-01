import { AppContext } from '@view/context/app-context'
import { PropsWithChildren, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrivateContainer({ children }: PropsWithChildren) {
  const { isLogin } = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogin) {
      navigate('/login')
    }
  }, [isLogin, navigate])

  return children
}
