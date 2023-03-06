import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'

export const StyledHeader = styled.header`
  padding: 3.125rem 0 3.125rem 3.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  opacity: 0.7;
  height: 10%;
  font-size: 0.875rem;
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
  margin-right: 1.875rem;
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
  }
`

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  width: fill-content;
  margin-right: 3.75rem;
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
  }

  &.active {
    color: ${({ theme }) => theme.colors.active};
  }
`
