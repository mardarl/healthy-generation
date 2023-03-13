import styled from 'styled-components'
import { lineUpNoOpacity } from './animatons'

export const StyledModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    align-items: flex-end;
  }
`

export const StyledModalBox = styled.div`
  display: block;
  background: ${({ theme }) => theme.colors.container};
  max-height: 70%;
  height: fit-content;
  width: 50%;
  overflow: scroll;
  padding: 0 1rem 1rem 1rem;
  border: 0.063rem solid ${({ theme }) => theme.colors.disabled};
  box-shadow: ${({ theme }) => `0 0 50px 3px ${theme.colors.header}`};
  animation: 2s ${lineUpNoOpacity} ease-out;
  position: relative;

  @media (max-width: ${({ theme }) => theme.tablets}) {
    width: 80%;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    max-height: 85%;
  }
`

export const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  height: 4rem;
  background: linear-gradient(0deg, transparent, ${({ theme }) => theme.colors.container});

  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.colors.disabledText};
    cursor: pointer;
    margin-top: 1rem;
  }
`
