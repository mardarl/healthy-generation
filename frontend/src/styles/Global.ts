import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @import url(https://fonts.googleapis.com/css2?family=Michroma&display=swap');

  * {
    box-sizing: border-box;
  }

  body, #root {
    background: ${({ theme }) => theme.colors.container};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Michroma', sans-serif;
    margin: 0;
    height: 100vh;
    position: relative;
  }

  h1 {
    font-family: 'Michroma', bold;
  }

  button, input, textarea {
    font-family: 'Michroma', sans-serif;
  }

  p {
    opacity: 1;
    line-height: 1.5;
  }

  img {
    max-width: 100%;
  }

  footer {
    background: ${({ theme }) => theme.colors.container};
    padding: 3.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10%;
    font-size: 0.5rem;
    color: ${({ theme }) => theme.colors.regularText};
  }
`

export default GlobalStyles
