import React, { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { convertUserResponse, convertUserSimpleResponse } from '../../common/convert'
import { RoutePaths } from '../../routes/routePaths'
import Button from '../../ui-components/Button'
import { login as loginRequest } from '../../api/auth'
import { Container } from '../../styles/Container.styled'
import { StyledLoginPage, Title } from '../../styles/LoginPage.styled'
import Input from '../../ui-components/Input'
import { useUser } from '../../common/hooks/useUser'
import { useAPIError } from '../../common/hooks/useAPIError'
import { useMutation } from 'react-query'
import LoadingScreen from '../../components/LoadingScreen'

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUser()
  const { addError } = useAPIError()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { mutateAsync: login, isLoading } = useMutation({
    mutationFn: loginRequest,
    onError: (err: Error) => addError(err?.message),
  })

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
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <StyledLoginPage>
          <Title>login page</Title>
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
      )}
    </Container>
  )
}

export default LoginPage
