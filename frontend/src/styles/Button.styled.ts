import styled from 'styled-components'

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.938rem 1.875rem;
  width: fit-content;
  opacity: 0.7;
  cursor: pointer;
  background: transparent;
  border: 0.063rem solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  span {
    margin: 0;
    font-size: 0.875rem;
  }

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.active};
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`
