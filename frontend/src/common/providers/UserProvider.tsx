import { createContext, useState, FunctionComponent, ReactNode } from 'react'
import { getUser } from '../../api/users'
import { User } from '../types'
import { useQuery } from 'react-query'
import { useAPIError } from '../hooks/useAPIError'

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

export const UserProvider: FunctionComponent<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const { addError } = useAPIError()

  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const localStorageUser = localStorage.getItem('user')
      if (localStorageUser) {
        return await getUser(JSON.parse(localStorageUser).id)
      }
      return null
    },
    onSuccess: (data: User | null) => {
      if (data) {
        setUser(data)
      }
    },
    onError: (err: Error) => addError(err?.message),
    retry: false,
  })

  const contextValue: UserContextType = {
    user,
    setUser,
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}
