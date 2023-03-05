import styled from 'styled-components'
import { fadeIn, lineUpNoOpacity } from './animatons'
import { Container } from './Container.styled'

export const StyledRecipePage = styled(Container)`
  display: flex;
  margin-top: 40px;
  height: fit-content;
  min-height: 80%;

  img {
    filter: grayscale(100%) brightness(60%);
    width: 30%;
    object-fit: cover;
    position: relative;
    overflow: hidden;
    animation: 2s ${fadeIn} ease-out;
  }
`

export const StyledRecipePageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  padding-left: 30px;
  animation: 2s ${lineUpNoOpacity} ease-out;
`

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  span {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.text};
  }

  svg {
    width: 30px;
    height: 30px;
  }
`

export const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-end;
`

export const StyledRecipeText = styled.span`
  font-size: 14px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.disabledText};
`

export const StyledRecipeStep = styled.li`
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.disabledText};
`

export const StyledRecipeTitle = styled.h4`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.regularText};
`
