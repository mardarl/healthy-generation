import styled from 'styled-components'
import { Container } from './Container.styled'

export const StyledNewRecipePage = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  height: fit-content;
  min-height: 100%;

  @media (max-width: ${({ theme }) => theme.tablets}) {
    margin-top: 0;
  }
`
