import { createContext, useState, FunctionComponent, ReactNode, useEffect, useContext } from 'react'
import { getUser } from './api/users'
import { User } from './common/types'

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

type UserContextProviderProps = {
  children: ReactNode
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

export const UserContextProvider: FunctionComponent<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const contextValue: UserContextType = {
    user,
    setUser,
  }

  const fetchUserData = async (id: string) => {
    setUser(await getUser(id))
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      fetchUserData(JSON.parse(user).id)
    }
  }, [])

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
