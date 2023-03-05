import styled from 'styled-components'
import { fadeIn, lineUpNoOpacity } from './animatons'
import { Container } from './Container.styled'

export const StyledRecipeListContainer = styled(Container)`
  background-color: ${({ theme }) => theme.colors.container};
  padding: 40px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: 80%;
`
export const StyledRecipeTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  animation: 2s ${fadeIn};

  span {
    font-size: 24px;
  }
`

export const StyledRecipeList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 58px;
  animation: 3s ${lineUpNoOpacity} ease-out;
`
export const StyledRecipe = styled.div`
  width: 30%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  cursor: pointer;

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
`

export const StyledRecipeContent = styled.div`
  background-color: ${({ theme }) => theme.colors.recipePreview};
  height: 200px;
  bottom: 17px;
  left: 17px;
  position: absolute;
  width: 90%;
  color: ${({ theme }) => theme.colors.regularText};
  opacity: 0.8;
`

export const StyledRecipeHeader = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    position: absolute;
    right: 15px;
    top: 10px;
    width: 25px;
    height: 25px;
  }
`

export const StyledRecipeName = styled.div`
  position: absolute;
  font-size: 42px;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  width: 90%;
  left: 20px;
  top: -65px;

  p {
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  span {
    display: block;
    width: 85%;
    font-size: 32px;
  }
`
export const StyledRecipeTime = styled.div`
  color: ${({ theme }) => theme.colors.body};
  position: absolute;
  bottom: 10px;
  left: 15px;
  font-size: 14px;
`

export const StyledRecipeCal = styled.div`
  color: ${({ theme }) => theme.colors.body};
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: 14px;
`
