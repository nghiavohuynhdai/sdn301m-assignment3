import { getUserProfile } from '@data/user/user-api'
import { UserDto } from '@data/user/user.dto'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

interface IAppContext {
  user: UserDto | null
  isLogin: boolean
  login?: () => void
  logout?: () => void
}
const initialContext: IAppContext = {
  user: null,
  isLogin: false
}

const AppContext = createContext<IAppContext>(initialContext)

function AppProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<UserDto | null>(null)
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const login = async () => {
    const userProfile = await getUserProfile()
    if (userProfile) {
      setUser(userProfile)
      setIsLogin(true)
    }
  }

  const logout = () => {
    setIsLogin(false)
  }

  useEffect(() => {
    const getUser = async () => {
      const userProfile = await getUserProfile()
      if (userProfile) {
        setUser(userProfile)
        setIsLogin(true)
      }
      setLoading(false)
    }
    getUser()
    return () => {}
  }, [])

  return !loading ? (
    <AppContext.Provider value={{ user, isLogin, login, logout }}>{children}</AppContext.Provider>
  ) : null
}

export { AppContext, AppProvider }
