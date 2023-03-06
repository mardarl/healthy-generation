import styled from 'styled-components'
import { lineUp } from './animatons'

export const StyledMainButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.938rem 1.875rem;
  width: fit-content;
  margin-top: 1.875rem;
  opacity: 0.5;
  animation: 3s ${lineUp} ease-out;
  cursor: pointer;
  background: transparent;
  border: 0.063rem solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  span {
    margin: 0;
    font-size: 1rem;
  }

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.active};
  }
`
