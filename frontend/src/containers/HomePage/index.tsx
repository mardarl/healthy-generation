import React, { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import { RoutePaths } from '../../routes/routePaths'
import { StyledHomePage, PageBox, PageInfo, Greating } from '../../styles/HomePage.styled'

import Button from '../../ui-components/Button'
import { useUser } from '../../common/hooks/useUser'

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <StyledHomePage>
      {user?.id ? (
        <Greating>{`hi ${user.firstName} we are glad to welcome you to`}</Greating>
      ) : (
        <Greating>we are glad to welcome you to</Greating>
      )}
      <h1>HEALTHY GENERATION platform</h1>
      <PageInfo>here you can (well, not yet) create your ideal ration for the day</PageInfo>
      <img src={'./assets/backgroung-image.jpg'} alt='' />
      <PageBox />

      {user?.id && (
        <Button onClick={() => navigate(RoutePaths.LOGIN)} main>
          <span>log in</span>
        </Button>
      )}
    </StyledHomePage>
  )
}

export default HomePage
