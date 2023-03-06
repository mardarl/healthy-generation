import styled from 'styled-components'
import { fadeIn, lineUpNoOpacity } from './animatons'
import { Container } from './Container.styled'

export const StyledRecipePage = styled(Container)`
  display: flex;
  margin-top: 2.5rem;
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
  padding-left: 1.875rem;
  animation: 2s ${lineUpNoOpacity} ease-out;
`

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.875rem;

  span {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  svg {
    width: 1.875rem;
    height: 1.875rem;
  }
`

export const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  justify-content: flex-end;
`

export const StyledRecipeText = styled.span`
  font-size: 0.875rem;
  margin-bottom: 0.625rem;
  color: ${({ theme }) => theme.colors.disabledText};
`

export const StyledRecipeStep = styled.li`
  font-size: 0.875rem;
  margin-bottom: 0.938rem;
  line-height: 1.875rem;
  color: ${({ theme }) => theme.colors.disabledText};
`

export const StyledRecipeTitle = styled.h4`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.regularText};
`
