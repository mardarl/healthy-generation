import { keyframes } from 'styled-components'

export const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const lineUpNoOpacity = keyframes`
0% {
    opacity: 0;
    transform: translateY(80%);
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`

export const lineUp = keyframes`
0% {
    opacity: 0;
    transform: translateY(80%);
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
    transform: translateY(0%);
  }
  100% {
    opacity: 0.5;
    transform: translateY(0%);
  }
`

export const lineSideNoOpacity = keyframes`
  0% {
    opacity: 0;
    transform: translateX(80%);
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateX(0%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
`

export const lineSide = keyframes`
    0% {
      opacity: 0;
      transform: translateX(80%);
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
      transform: translateX(0%);
    }
    100% {
      opacity: 0.5;
      transform: translateX(0%);
    }
`

export const fadeIn = keyframes`
0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
