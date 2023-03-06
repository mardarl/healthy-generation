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
    left: 21.875rem;
    width: 62.5rem;
  }

  button {
    position: absolute;
    left: 21.875rem;
    bottom: 6.25rem;
  }
`

export const StyledHomePageBox = styled.div`
  background: ${({ theme }) => theme.colors.homeBox};
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: -0.438rem;
  width: 81.563rem;
  animation: 3s ${lineSide} ease-out;
  height: 28.125rem;
  opacity: 0.5;
`
export const StyledHomePageGreating = styled.span`
  position: absolute;
  margin: 1.875rem 0 0 0.313rem;
  animation: 4s ${lineUpNoOpacity} ease-out;
  z-index: 3;
  left: 21.875rem;
  top: 11.875rem;
}`

export const StyledHomePageInfo = styled.span`
  position: absolute;
  margin: 1.875rem 0 0 0.313rem;
  animation: 4s ${lineUpNoOpacity} ease-out;
  z-index: 3;
  left: 21.875rem;
  bottom: 11.875rem;
`
