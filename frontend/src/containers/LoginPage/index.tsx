import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../../UserContext'
import { convertUserResponse, convertUserSimpleResponse } from '../../common/convertResponse'

import { RoutePaths } from '../../routes/routePaths'

import Button from '../../ui-components/Button'
import { login } from '../../api/auth'
import { Container } from '../../styles/Container.styled'
import { StyledLoginPage, StyledTitle } from '../../styles/LoginPage.styled'
import Input from '../../ui-components/Input'

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    user?.id && navigate(RoutePaths.HOME)
  }, [user])

  const handleLogin = async () => {
    const { token, user } = await login({ email, password })
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(convertUserSimpleResponse(user)))
    setUser(convertUserResponse(user))
    navigate(RoutePaths.HOME)
  }

  const handleKeypress = (e: any) => {
    if (e.charCode === 13) {
      handleLogin()
    }
  }

  return (
    <Container>
      <StyledLoginPage>
        <StyledTitle>login page</StyledTitle>
        <div>
          <Input label={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label={'password'}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeypress}
          />
        </div>
        <Button onClick={handleLogin}>log in</Button>
      </StyledLoginPage>
    </Container>
  )
}

export default LoginPage
