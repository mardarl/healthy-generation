import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 0 15%;
  margin: 0 auto;
  min-height: 80%;

  @media (max-width: ${({ theme }) => theme.laptop}) {
    padding: 0 10%;
  }
`
