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
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.regularText};
`

export const StyledSelectorRow = styled.div`
  display: flex;
  width: 100%;
  gap: 0.625rem;

  button {
    height: 3.375rem;
  }
`

export const StyledPictureSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.938rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.regularText};

  > div {
    border: 0.063rem solid ${({ theme }) => theme.colors.disabled};
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 0.625rem;
      display: block;
      color: ${({ theme }) => theme.colors.disabledText};
    }
  }
`
