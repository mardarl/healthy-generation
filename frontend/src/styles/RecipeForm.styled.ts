import styled from 'styled-components'
import { fadeIn, lineUpNoOpacity } from './animatons'

export const StyledRecipeForm = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: 80%;
  animation: 2s ${fadeIn} ease-out;

  img {
    filter: grayscale(100%) brightness(60%);
    height: 100%;
    width: 30%;
    object-fit: cover;
    position: relative;
    overflow: hidden;
    animation: 2s ${lineUpNoOpacity} ease-out;
  }
`
export const StyledRecipeTitle = styled.h4`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.regularText};
`

export const StyledSelectorRow = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;

  button {
    height: 54px;
  }
`

export const StyledPictureSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.regularText};

  > div {
    border: 1px solid ${({ theme }) => theme.colors.disabled};
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 10px;
      display: block;
      color: ${({ theme }) => theme.colors.disabledText};
    }
  }
`
