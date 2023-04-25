import styled from 'styled-components'

type ButtonProps = {
  main?: boolean
}

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.85rem;
  width: fit-content;
  opacity: ${({ main }) => (main ? '0.5' : '0.7')};
  cursor: pointer;
  background: transparent;
  border: 0.065rem solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ main }) => main && '1.875rem'};

  span {
    margin: 0;
    font-size: ${({ main }) => (main ? '1rem' : '0.875rem')};
  }

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.active};
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0.5rem 0.7rem;
  }
`
