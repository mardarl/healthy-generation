import React, { FunctionComponent } from 'react'
import { StyledButton } from '../../styles/Button.styled'
import { StyledMainButton } from '../../styles/MainButton.styled'

export type ButtonProps = {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  main?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({
  onClick = () => null,
  disabled,
  children,
  main = false,
  ...rest
}) => {
  return (
    <>
      {main ? (
        <StyledMainButton onClick={() => onClick()} disabled={disabled} {...rest}>
          {children}
        </StyledMainButton>
      ) : (
        <StyledButton onClick={() => onClick()} disabled={disabled} {...rest}>
          {children}
        </StyledButton>
      )}
    </>
  )
}

export default Button
