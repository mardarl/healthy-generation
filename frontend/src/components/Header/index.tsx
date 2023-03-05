import React, { FunctionComponent } from 'react'
import { RoutePaths } from '../../routes/routePaths'
import { StyledHeader, StyledLink, Nav, StyledNavLink } from '../../styles/Header.styped'
import { useUser } from '../../UserContext'

const Header: FunctionComponent = () => {
  const { user } = useUser()

  return (
    <StyledHeader>
      <StyledLink to={RoutePaths.HOME}>HGR</StyledLink>
      <Nav>
        {user && <StyledNavLink to={RoutePaths.FAVOURITE_RECIPES}>favourite recipes</StyledNavLink>}
        {user && <StyledNavLink to={RoutePaths.ALL_RECIPES}>all recipes</StyledNavLink>}
        {user && <StyledNavLink to={RoutePaths.PROFILE}>profile</StyledNavLink>}
      </Nav>
    </StyledHeader>
  )
}

export default Header
