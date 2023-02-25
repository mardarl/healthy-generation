import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../../UserContext'
import { convertUserSimpleResponse } from '../../common/convertResponse'

import { RoutePaths } from '../../routes/routePaths'

import Button from '../../ui-components/Button'
import { login } from '../../api/auth'

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    user?.userId && navigate(RoutePaths.HOME)
  }, [user, navigate])

  const handleLogin = async () => {
    const { token, user } = await login({ email, password })
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setUser(convertUserSimpleResponse(user))
    navigate(RoutePaths.HOME)
  }

  return (
    <div className='LoginPage'>
      <p>login page</p>
      <p>email</p>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <p>password</p>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>log in</Button>
    </div>
  )
}

export default LoginPage
