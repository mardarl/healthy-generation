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
export const RecipeTitle = styled.h4`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.regularText};
`

export const SelectorRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 0.625rem;

  > div {
    width: 49%;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;

    > div {
      width: 100%;
    }
  }
`

export const SelectorRowGroup = styled.div`
  display: flex;
  gap: 0.625rem;

  input {
    width: 100%;
  }

  button {
    height: 3.375rem;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      height: 2rem;
      margin-bottom: 1.875rem;
    }
  }
`

export const TextareaRow = styled.div`
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

export const TextareaRowButtons = styled.div`
  display: flex;
  gap: 0.625rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: flex;
    flex-direction: column;
    gap: 0;

    button {
      margin-bottom: 0.625rem;
      width: 2.07rem;
    }
  }
`

export const PictureSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.935rem;
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
