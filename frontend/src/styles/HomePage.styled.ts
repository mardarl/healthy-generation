import styled from 'styled-components'
import { lineSide, lineSideNoOpacity, lineUpNoOpacity } from './animatons'

export const StyledHomePage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 80%;
  position: relative;

  img {
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 5rem;
    width: 62.5rem;
    animation: 4s ${lineSideNoOpacity} ease-out;
  }

  h1 {
    position: absolute;
    font-size: 7.5rem;
    margin: 0;
    line-height: 0.9;
    animation: 3s ${lineUpNoOpacity} ease-out;
    z-index: 3;
    left: 16.875rem;
    width: 62.5rem;
  }

  button {
    position: absolute;
    left: 16.875rem;
    bottom: 6.25rem;
  }

  @media (max-width: ${({ theme }) => theme.laptop}) {
    padding: 0 10%;
    background: ${({ theme }) => theme.colors.homeBox};
    animation: 3s ${lineSideNoOpacity} ease-out;

    img {
      display: none;
    }

    h1 {
      position: relative;
      display: flex;
      left: 0;
      font-size: 5.5rem;
      width: 100%;
    }

    span,
    button {
      position: relative;
      display: flex;
      top: 0;
      left: 0;
      bottom: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.tablets}) {
    h1 {
      font-size: 3.5rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    gap: 0.5rem;

    h1 {
      font-size: 2rem;
      line-height: 1.3;
    }

    span {
      font-size: 0.5rem;
      margin: 0;
    }
  }
`

export const PageBox = styled.div`
  background: ${({ theme }) => theme.colors.homeBox};
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: -0.435rem;
  width: 81.565rem;
  animation: 3s ${lineSide} ease-out;
  height: 28.125rem;
  opacity: 0.5;

  @media (max-width: ${({ theme }) => theme.laptop}) {
    display: none;
  }
`
export const Greating = styled.span`
  position: absolute;
  margin: 1.875rem 0 0 0.315rem;
  animation: 4s ${lineUpNoOpacity} ease-out;
  z-index: 3;
  left: 17.25rem;
  top: 12rem;
  text-transform: lowercase;

  @media (max-width: ${({ theme }) => theme.tablets}) {
    margin-bottom: 1rem;
  }
}`

export const PageInfo = styled.span`
  position: absolute;
  margin: 1.875rem 0 0 0.315rem;
  animation: 4s ${lineUpNoOpacity} ease-out;
  z-index: 3;
  left: 16.875rem;
  bottom: 11.875rem;
`
