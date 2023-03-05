import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'

export const StyledHeader = styled.header`
  padding: 50px 0 50px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  opacity: 0.7;
  height: 10%;
  font-size: 14px;
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  width: fill-content;
  margin-right: 30px;
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
  }
`

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  width: fill-content;
  margin-right: 60px;
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
  }

  &.active {
    color: ${({ theme }) => theme.colors.active};
  }
`
