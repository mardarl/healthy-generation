import styled from 'styled-components'
import { rotate360 } from './animatons'

const StyledLoadingScreen = styled.div`
  background: ${({ theme }) => theme.colors.container};
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.97;

  > div {
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);
    border-top: 0.5rem solid ${({ theme }) => theme.colors.body};
    border-right: 0.5rem solid ${({ theme }) => theme.colors.body};
    border-bottom: 0.5rem solid ${({ theme }) => theme.colors.body};
    border-left: 0.5rem solid ${({ theme }) => theme.colors.header};
    background: transparent;
    width: 9.375rem;
    height: 9.375rem;
    border-radius: 50%;
  }
`

export default StyledLoadingScreen
