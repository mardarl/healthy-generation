import styled from 'styled-components'

export const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
  height: 100%;

  div {
    width: 34.375rem;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 100%;
    }
  }
`

export const StyledTitle = styled.span`
  font-size: 1.5rem;
  display: block;
  margin-bottom: 4.375rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-bottom: 3rem;
  }
`
