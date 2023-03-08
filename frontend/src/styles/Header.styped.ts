import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'
import { lineSideNoOpacity, lineUpNoOpacity } from './animatons'

type HamburgerProps = {
  isVisible: boolean
}

export const StyledHeader = styled.header`
  padding: 3.125rem 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  font-size: 0.875rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.laptop}) {
    padding: 3.125rem 10%;
  }

  svg {
    cursor: pointer;
    height: 1.5rem;
    width: 1.5rem;
    display: none;
    position: relative;
    animation: 1s ${lineSideNoOpacity} ease-out;

    &:hover {
      color: ${({ theme }) => theme.colors.active};
    }

    @media (max-width: ${({ theme }) => theme.tablets}) {
      display: flex;
    }
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.tablets}) {
    display: none;
  }
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
  color: ${({ theme }) => theme.colors.disabledText};
  width: fill-content;
  margin-left: 3.75rem;
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
  }

  &.active {
    color: ${({ theme }) => theme.colors.active};
  }

  @media (max-width: ${({ theme }) => theme.tablets}) {
    margin-right: 0;
    color: ${({ theme }) => theme.colors.disabledText};

    &.active {
      color: ${({ theme }) => theme.colors.active};
    }
  }
`

export const StyledHamburger = styled.div<HamburgerProps>`
  padding: 1.5rem;
  display: none;
  align-items: flex-end;
  font-size: 0.875rem;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.container};
  border: 0.063rem solid ${({ theme }) => theme.colors.border};
  position: absolute;
  right: 15%;
  top: 4.5rem;
  animation: 1s ${lineUpNoOpacity} ease-out;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.tablets}) {
    display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  }

  @media (max-width: ${({ theme }) => theme.laptop}) {
    right: 10%;
  }
`
