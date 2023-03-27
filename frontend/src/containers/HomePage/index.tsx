import React, { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import { RoutePaths } from '../../routes/routePaths'
import {
  StyledHomePage,
  StyledHomePageBox,
  StyledHomePageInfo,
  StyledHomePageGreating,
} from '../../styles/HomePage.styled'

import Button from '../../ui-components/Button'
import { useUser } from '../../common/hooks/useUser'

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <StyledHomePage>
      {user?.id ? (
        <StyledHomePageGreating>{`hi ${user.firstName.toLowerCase()} we are glad to welcome you to`}</StyledHomePageGreating>
      ) : (
        <StyledHomePageGreating>we are glad to welcome you to</StyledHomePageGreating>
      )}
      <h1>HEALTHY GENERATION platform</h1>
      <StyledHomePageInfo>here you can (well, not yet) create your ideal ration for the day</StyledHomePageInfo>
      <img src={'./assets/backgroung-image.jpg'} alt='' />
      <StyledHomePageBox />

      {!user?.id && (
        <Button onClick={() => navigate(RoutePaths.LOGIN)} main>
          <span>log in</span>
        </Button>
      )}
    </StyledHomePage>
  )
}

export default HomePage
