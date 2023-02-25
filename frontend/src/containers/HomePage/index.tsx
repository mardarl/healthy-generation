import React, { FunctionComponent, useContext } from 'react'
import { useNavigate } from 'react-router'

import { RoutePaths } from '../../routes/routePaths'

import Button from '../../ui-components/Button'
import { UserContext, useUser } from '../../UserContext'

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate()

  const { user } = useUser()
  const { setUser } = useContext(UserContext)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div className='HomePage'>
      <p>home page</p>
      {user?.userId && <p>{`hi, ${user.firstName} ${user.lastMame}`}</p>}
      {user?.userId ? (
        <Button onClick={handleLogout}>log out</Button>
      ) : (
        <Button onClick={() => navigate(RoutePaths.LOGIN)}>log in</Button>
      )}
    </div>
  )
}

export default HomePage
