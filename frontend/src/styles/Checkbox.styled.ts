import styled from 'styled-components'

export const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;

  input {
    margin: 0;
    width: 1.35rem;
    height: 1.25rem;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    outline: 0.063rem solid ${({ theme }) => theme.colors.disabled};
    box-shadow: none;
    text-align: center;
    background: ${({ theme }) => theme.colors.container};

    &:checked:after {
      content: '✔';
      color: ${({ theme }) => theme.colors.text};
    }
  }

  span {
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.regularText};
  }
`
