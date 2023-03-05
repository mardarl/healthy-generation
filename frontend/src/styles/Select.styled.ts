import styled from 'styled-components'

type InputProps = {
  errors?: string
  disabled?: boolean
  selected?: boolean
}

export const StyledSelect = styled.div<InputProps>`
  width: 100%;
  margin-bottom: 30px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  position: relative;

  span {
    font-size: 16px;
    display: block;
    padding: 15px 10px;
    color: ${({ selected, theme }) => (selected ? theme.colors.text : theme.colors.placeholder)};
  }

  input {
    background: ${({ theme }) => theme.colors.container};
    color: ${({ disabled, theme }) => (disabled ? theme.colors.disabledText : theme.colors.text)};
    padding: 15px 10px;
    border: none;
    border-bottom: 1px solid ${({ errors, theme }) => (errors ? theme.colors.error : theme.colors.disabled)};
    outline: none;
    font-size: 16px;
    min-width: 50px;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'text')};

    &:focus {
      border-bottom: 1px solid ${({ errors, theme }) => (errors ? theme.colors.error : theme.colors.border)};
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
    border-bottom: 1px solid #858585;
    -webkit-text-fill-color: white;
    transition: background-color 5000s ease-in-out 0s;
  }
}
`

export const StyledLabel = styled.span`
  font-size: 12px;
  display: block;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.regularText};
`

export const StyledInputError = styled.span`
  font-size: 10px;
  display: block;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.error};
`

export const StyledSelectBody = styled.div`
  position: absolute;
  width: 100%;
  background: ${({ theme }) => theme.colors.body};
  top: 60px;
  z-index: 1;

  span {
    font-size: 14px;
    display: block;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.active};
    margin: 10px;

    &:hover {
      background: ${({ theme }) => theme.colors.active};
      color: ${({ theme }) => theme.colors.container};
    }
  }
`
