import styled from 'styled-components'
import { fadeIn } from './animatons'

export const StyledProductForm = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: 2s ${fadeIn} ease-out;
  padding: 0 1rem;

  a {
    font-size: 1rem;
    text-decoration: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    margin: 1.5rem 0;

    &:hover {
      color: ${({ theme }) => theme.colors.active};
    }
  }
`

export const ProductTitle = styled.h4`
  font-size: 1rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.regularText};
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;

  span {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  svg {
    width: 1.875rem;
    height: 1.875rem;
  }

  @media (max-width: ${({ theme }) => theme.tablets}) {
    span {
      margin-right: 1.875rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    flex-direction: column;

    > div {
      margin: 0;
    }

    span {
      width: 100%;
      text-align: right;
      margin-right: 0;
    }
  }
`
