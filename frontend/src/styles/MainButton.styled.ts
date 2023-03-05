import styled from 'styled-components'
import { lineUp } from './animatons'

export const StyledMainButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  width: fit-content;
  margin-top: 30px;
  opacity: 0.5;
  animation: 3s ${lineUp} ease-out;
  cursor: pointer;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  span {
    margin: 0;
    font-size: 16px;
  }

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.active};
  }
`
