import styled from 'styled-components'
import { fadeIn, lineUpNoOpacity } from './animatons'
import { Container } from './Container.styled'

export const StyledProfilePage = styled(Container)`
  display: flex;
  padding-top: 40px;
  height: 100%;

  img {
    filter: grayscale(100%) brightness(60%);
    height: 100%;
    width: 30%;
    object-fit: cover;
    position: relative;
    overflow: hidden;
    animation: 2s ${fadeIn} ease-out;
  }
`

export const StyledProfilePageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  margin-right: 30px;
  animation: 2s ${lineUpNoOpacity} ease-out;
`

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  span {
    font-size: 24px;
  }
`

export const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-end;
`
