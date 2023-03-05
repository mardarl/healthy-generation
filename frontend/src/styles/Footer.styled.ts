import styled from 'styled-components'

export const StyledFooter = styled.footer`
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  font-size: 8px;
  color: ${({ theme }) => theme.colors.regularText};
`
