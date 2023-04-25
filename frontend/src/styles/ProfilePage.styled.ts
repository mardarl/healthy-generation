import styled from 'styled-components'
import { fadeIn, lineUpNoOpacity } from './animatons'
import { Container } from './Container.styled'

export const StyledProfilePage = styled(Container)`
  display: flex;
  padding-top: 2.5rem;

  img {
    filter: grayscale(100%) brightness(60%);
    width: 30%;
    object-fit: cover;
    overflow: hidden;
    animation: 2s ${fadeIn} ease-out;
  }

  @media (max-width: ${({ theme }) => theme.tablets}) {
    height: fit-content;
    padding-top: 0;

    img {
      height: auto;
    }
  }
`

export const ProfilePageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  margin-right: 1.875rem;
  animation: 2s ${lineUpNoOpacity} ease-out;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.875rem;

  span {
    font-size: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.tablets}) {
    width: 100%;
    flex-direction: column;

    span {
      width: 100%;
      text-align: right;
      margin-right: 0;
    }
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.tablets}) {
    flex-wrap: wrap;
    width: 100%;
    margin: 1rem 0 1.5rem 0;
  }
`
