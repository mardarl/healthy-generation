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
    right: 0px;
    bottom: 80px;
    width: 1000px;
    animation: 4s ${lineSideNoOpacity} ease-out;
  }

  h1 {
    position: absolute;
    font-size: 120px;
    margin: 0;
    line-height: 0.9;
    animation: 3s ${lineUpNoOpacity} ease-out;
    z-index: 3;
    left: 350px;
    width: 1000px;
  }

  button {
    position: absolute;
    left: 350px;
    bottom: 100px;
  }
`

export const StyledHomePageBox = styled.div`
  background: ${({ theme }) => theme.colors.homeBox};
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: -7px;
  width: 1305px;
  animation: 3s ${lineSide} ease-out;
  height: 450px;
  opacity: 0.5;
`
export const StyledHomePageGreating = styled.span`
  position: absolute;
  margin: 30px 0 0 5px;
  animation: 4s ${lineUpNoOpacity} ease-out;
  z-index: 3;
  left: 350px;
  top: 190px;
}`

export const StyledHomePageInfo = styled.span`
  position: absolute;
  margin: 30px 0 0 5px;
  animation: 4s ${lineUpNoOpacity} ease-out;
  z-index: 3;
  left: 350px;
  bottom: 190px;
`
