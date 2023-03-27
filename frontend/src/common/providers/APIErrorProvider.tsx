import React, { useState, useCallback, ReactNode, createContext, FunctionComponent } from 'react'

type Error = {
  message: string
}

type APIErrorContextType = {
  error: Error | null
  addError: (message: string) => void
  removeError: () => void
}

type APIErrorContextProviderProps = {
  children: ReactNode
}

export const APIErrorContext = createContext<APIErrorContextType>({
  error: null,
  addError: () => {},
  removeError: () => {},
})

export const APIErrorProvider: FunctionComponent<APIErrorContextProviderProps> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null)

  const removeError = () => setError(null)

  const addError = (message: string) => setError({ message })

  const contextValue = {
    error,
    addError: useCallback((message: string) => addError(message), []),
    removeError: useCallback(() => removeError(), []),
  }

  return <APIErrorContext.Provider value={contextValue}>{children}</APIErrorContext.Provider>
}
