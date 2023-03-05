import styled from 'styled-components'
import { rotate360 } from './animatons'

const StyledLoadingScreen = styled.div`
  background: ${({ theme }) => theme.colors.header};
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.97;

  > div {
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);
    border-top: 8px solid ${({ theme }) => theme.colors.body};
    border-right: 8px solid ${({ theme }) => theme.colors.body};
    border-bottom: 8px solid ${({ theme }) => theme.colors.body};
    border-left: 8px solid ${({ theme }) => theme.colors.header};
    background: transparent;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`

export default StyledLoadingScreen
