import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      header: string
      body: string
      footer: string
      text: string
      active: string
      container: string
      border: string
      recipePreview: string
      regularText: string
      homeBox: string
      disabled: string
      error: string
      disabledText: string
      placeholder: string
    }
    mobile: string
  }
}
