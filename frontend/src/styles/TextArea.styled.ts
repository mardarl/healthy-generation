import styled from 'styled-components'

type TextareaProps = {
  height?: number
}

export const StyledTextarea = styled.textarea<TextareaProps>`
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : 'fit-content')};
  overflow: scroll;
  resize: vertical;
  margin-bottom: 30px;
  background: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.text};
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.disabled};
  font-family: 'Michroma', Regular;
  outline: none;
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'text')};
`
