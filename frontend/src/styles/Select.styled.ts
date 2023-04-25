import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'

type InputProps = {
  errors?: string
  disabled?: boolean
  selected?: boolean
}

type BodyProps = {
  withSearch?: boolean
}

type SearchProps = {
  withButton?: boolean
}

export const StyledSelect = styled.div<InputProps>`
  margin-bottom: 1.875rem;
  cursor: pointer;
  border-bottom: 0.065rem solid ${({ theme }) => theme.colors.disabled};
  position: relative;

  span {
    font-size: 1rem;
    display: block;
    padding: 0.938rem 0.625rem;
    color: ${({ selected, theme }) => (selected ? theme.colors.text : theme.colors.placeholder)};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  input {
    background: ${({ theme }) => theme.colors.container};
    color: ${({ disabled, theme }) => (disabled ? theme.colors.disabledText : theme.colors.text)};
    padding: 0.938rem 0.625rem;
    border: none;
    border-bottom: 0.065rem solid ${({ errors, theme }) => (errors ? theme.colors.error : theme.colors.disabled)};
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

export const Label = styled.span`
  font-size: 0.75rem;
  display: block;
  margin-bottom: 0.315rem;
  color: ${({ theme }) => theme.colors.regularText};
`

export const InputError = styled.span`
  font-size: 0.875rem;
  display: block;
  margin-top: 0.315rem;
  color: ${({ theme }) => theme.colors.error};
`

export const NoResults = styled.p`
  font-size: 0.875rem;
  display: block;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.regularText};
  border: none;
  text-align: center;
  margin-top: 1rem;
`

export const SelectBody = styled.div`
  position: absolute;
  width: 100%;
  background: ${({ theme }) => theme.colors.container};
  top: 3.75rem;
  z-index: 1;
  border: 0.063rem solid ${({ theme }) => theme.colors.disabled};
  cursor: default;
  box-shadow: ${({ theme }) => `0 0 50px 3px ${theme.colors.header}`};
`

export const StyledInfiniteScroll = styled.div<BodyProps>`
  position: absolute;
  width: 100%;
  background: ${({ theme }) => theme.colors.container};
  top: 3.75rem;
  top: ${({ withSearch }) => (withSearch ? '9rem' : '3.75rem')};
  z-index: 1;
  border: 0.065rem solid ${({ theme }) => theme.colors.disabled};
  cursor: default;
  box-shadow: ${({ theme }) => `0 0 50px 3px ${theme.colors.header}`};
  max-height: 20.85rem;
  overflow: scroll;

  p {
    font-size: 0.5rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.disabledText};
  }
`

export const SelectBodyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.625rem;

  span {
    width: 100%;
    font-size: 0.875rem;
    display: block;
    color: ${({ theme }) => theme.colors.text};
    border: 0.063rem solid ${({ theme }) => theme.colors.active};
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &:hover {
      background: ${({ theme }) => theme.colors.active};
      color: ${({ theme }) => theme.colors.container};
    }
  }
`

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ theme }) => theme.colors.disabled};
    cursor: pointer;
  }
`

export const SearchContainer = styled.div<SearchProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.625rem;
  gap: 0.625rem;

  > div {
    margin-bottom: 0;
    width: ${({ withButton }) => (withButton ? 'calc(100% - 4.375rem)' : '100%')};

    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
    }
  }

  input {
    border: 0.063rem solid ${({ theme }) => theme.colors.active};
    font-size: 0.85rem;

    &:focus {
      border: 0.063rem solid ${({ theme }) => theme.colors.active};
    }
  }

  button {
    width: 3.125rem;
    height: 3.125rem;
    border: 0.063rem solid ${({ theme }) => theme.colors.active};
  }
`
