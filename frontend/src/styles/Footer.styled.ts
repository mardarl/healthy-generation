import styled from 'styled-components'

export const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.colors.container};
  padding: 3.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;

  span {
    font-size: 0.5rem;
    color: ${({ theme }) => theme.colors.regularText};
  }
`
