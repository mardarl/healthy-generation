import styled from 'styled-components'

type TextareaProps = {
  height?: number
}

export const StyledTextarea = styled.textarea<TextareaProps>`
  width: 100%;
  height: ${({ height }) => (height ? `${height}rem` : 'fit-content')};
  min-height: 3.375rem;
  overflow: scroll;
  resize: vertical;
  margin-bottom: 1.875rem;
  background: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.935rem;
  border: 0.065rem solid ${({ theme }) => theme.colors.disabled};
  font-family: 'Michroma', Regular;
  outline: none;
  font-size: 0.875rem;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'text')};

  @media (max-width: ${({ theme }) => theme.mobile}) {
    min-height: 4rem;
  }
`
