import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { RoutePaths } from '../../routes/routePaths'
import { StyledHeader, StyledLink, Nav, StyledNavLink, StyledHamburger } from '../../styles/Header.styped'
import { useUser } from '../../UserContext'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

const Header: FunctionComponent = () => {
  const { user } = useUser()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return (
    <StyledHeader>
      <StyledLink to={RoutePaths.HOME}>HGR</StyledLink>
      {user && (
        <Nav>
          <StyledNavLink to={RoutePaths.FAVOURITE_RECIPES}>favourite recipes</StyledNavLink>
          <StyledNavLink to={RoutePaths.ALL_RECIPES}>all recipes</StyledNavLink>
          <StyledNavLink to={RoutePaths.PROFILE}>profile</StyledNavLink>
        </Nav>
      )}
      {user && !isVisible && <HiOutlineMenu onClick={() => setIsVisible(true)} />}
      {user && isVisible && <HiOutlineX onClick={() => setIsVisible(false)} />}
      <StyledHamburger ref={ref} isVisible={isVisible}>
        <StyledNavLink onClick={() => setIsVisible(false)} to={RoutePaths.FAVOURITE_RECIPES}>
          favourite recipes
        </StyledNavLink>
        <StyledNavLink onClick={() => setIsVisible(false)} to={RoutePaths.ALL_RECIPES}>
          all recipes
        </StyledNavLink>
        <StyledNavLink onClick={() => setIsVisible(false)} to={RoutePaths.PROFILE}>
          profile
        </StyledNavLink>
      </StyledHamburger>
    </StyledHeader>
  )
}

export default Header
