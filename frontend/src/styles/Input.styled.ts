import styled from 'styled-components'

type InputProps = {
  errors?: string
  disabled?: boolean
}

type LabelProps = {
  marginBottom?: number
  marginTop?: number
}

export const StyledInput = styled.div<InputProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1.875rem;

  input {
    background: ${({ theme }) => theme.colors.container};
    color: ${({ disabled, theme }) => (disabled ? theme.colors.disabledText : theme.colors.text)};
    padding: 0.938rem 0.625rem;
    border: none;
    border-bottom: 0.063rem solid ${({ errors, theme }) => (errors ? theme.colors.error : theme.colors.disabled)};
    outline: none;
    font-size: 1rem;
    min-width: 3.125rem;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'text')};

    &:focus {
      border-bottom: 0.063rem solid ${({ errors, theme }) => (errors ? theme.colors.error : theme.colors.border)};
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }

  input[type=number] {
  -moz-appearance: textfield;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    background: #12151a;
    border-bottom: 0.063rem solid #858585;
    -webkit-text-fill-color: white;
    transition: background-color 5000s ease-in-out 0s;
  }
}
`

export const StyledLabel = styled.span<LabelProps>`
  font-size: 0.75rem;
  display: block;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}rem` : '0.313rem')};
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}rem` : 0)};
  color: ${({ theme }) => theme.colors.regularText};
`

export const StyledInputError = styled.span`
  font-size: 0.625rem;
  display: block;
  margin-top: 0.313rem;
  color: ${({ theme }) => theme.colors.error};
`
