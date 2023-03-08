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
  justify-content: space-between;
  width: 100%;
  gap: 0.625rem;

  button {
    height: 3.375rem;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      height: 2rem;
      margin-bottom: 1.875rem;
    }
  }
`

export const StyledTextareaRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 0.625rem;

  button {
    height: 3.375rem;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      height: 2rem;
      margin-bottom: 1.875rem;
    }
  }
`

export const StyledTextareaRowButtons = styled.div`
  display: flex;
  gap: 0.625rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: flex;
    flex-direction: column;
    gap: 0;

    button {
      margin-bottom: 0.625rem;
      width: 2.071rem;
    }
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
