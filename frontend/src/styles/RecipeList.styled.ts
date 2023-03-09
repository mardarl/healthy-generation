import styled from 'styled-components'
import { fadeIn, lineSideNoOpacity, lineUpNoOpacity } from './animatons'
import { Container } from './Container.styled'

export const StyledRecipeListContainer = styled(Container)`
  background-color: ${({ theme }) => theme.colors.container};
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: 80%;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`
export const StyledRecipeTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.875rem;
  animation: 2s ${fadeIn};

  span {
    font-size: 1.5rem;
    min-width: fit-content;
  }

  @media (max-width: ${({ theme }) => theme.tablets}) {
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    margin: 1rem 0 1.5rem 0;
  }
`

export const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  justify-content: flex-end;
  width: -webkit-fill-available;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.disabledText};
    animation: 1s ${fadeIn};
  }

  div {
    max-width: 20rem;
    margin-bottom: 0.1rem;
    height: 3.125rem;

    input {
      animation: 1s ${lineSideNoOpacity} ease-out;
      background: transparent;
      padding-right: 2.5rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.tablets}) {
    flex-wrap: wrap;
    width: 100%;
    margin: 1rem 0 1.5rem 0;
  }
`

export const StyledSearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0;

  svg {
    margin-left: -2rem;
  }
`

export const StyledRecipeList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 3.625rem;
  column-gap: 5%;
  animation: 3s ${lineUpNoOpacity} ease-out;

  @media (max-width: ${({ theme }) => theme.tablets}) {
    column-gap: 10%;
  }
`
export const StyledRecipe = styled.div`
  width: 30%;
  height: 28.125rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  transition: all ease-in-out 0.3s;

  img {
    filter: grayscale(100%);
    height: 100%;
    object-fit: cover;
    position: relative;
    overflow: hidden;
  }

  &:hover {
    transform: scale(1.03);
    > div {
      opacity: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.tablets}) {
    width: 45%;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`

export const StyledRecipeContent = styled.div`
  background-color: ${({ theme }) => theme.colors.recipePreview};
  height: 12.5rem;
  bottom: 1.063rem;
  left: 1.063rem;
  position: absolute;
  width: 90%;
  color: ${({ theme }) => theme.colors.regularText};
  opacity: 0.8;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    bottom: 1.5rem;
    left: 1.5rem;
  }
`

export const StyledRecipeHeader = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    position: absolute;
    right: 0.938rem;
    top: 0.625rem;
    width: 1.563rem;
    height: 1.563rem;
  }
`

export const StyledRecipeName = styled.div`
  position: absolute;
  font-size: 2.625rem;
  max-height: 6.25rem;
  display: flex;
  flex-direction: column;
  width: 90%;
  left: 1.25rem;
  top: -4.063rem;

  p {
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  span {
    display: block;
    width: 85%;
    font-size: 2rem;
  }
`
export const StyledRecipeTime = styled.div`
  color: ${({ theme }) => theme.colors.body};
  position: absolute;
  bottom: 0.625rem;
  left: 0.938rem;
  font-size: 0.875rem;
`

export const StyledRecipeCal = styled.div`
  color: ${({ theme }) => theme.colors.body};
  position: absolute;
  bottom: 0.625rem;
  right: 0.938rem;
  font-size: 0.875rem;
`
