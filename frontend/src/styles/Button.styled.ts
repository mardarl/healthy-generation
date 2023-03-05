import styled from 'styled-components'

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  width: fit-content;
  opacity: 0.7;
  cursor: pointer;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  span {
    margin: 0;
    font-size: 14px;
  }

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.active};
  }

  &:disabled {
    opacity: 0.5;
    cursor: none;
  }
`
