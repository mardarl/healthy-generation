import React, { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import { RoutePaths } from '../../routes/routePaths'

import Button from '../../ui-components/Button'
import { useUser } from '../../UserContext'

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className='HomePage'>
      <p>home page</p>
      {user?.id && <p>{`hi, ${user.firstName} ${user.lastName}`}</p>}
      {!user?.id && <Button onClick={() => navigate(RoutePaths.LOGIN)}>log in</Button>}
    </div>
  )
}

export default HomePage
