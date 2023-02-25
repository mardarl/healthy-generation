import { createContext, useState, FunctionComponent, ReactNode, useEffect, useContext } from 'react'
import { convertUserSimpleResponse } from './common/convertResponse'
import { UserSimple } from './common/types'

type UserContextType = {
  user: UserSimple | null
  setUser: (user: UserSimple | null) => void
}

type UserContextProviderProps = {
  children: ReactNode
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

export const UserContextProvider: FunctionComponent<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserSimple | null>(null)

  const contextValue: UserContextType = {
    user,
    setUser,
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(convertUserSimpleResponse(JSON.parse(user)))
    }
  }, [])

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
