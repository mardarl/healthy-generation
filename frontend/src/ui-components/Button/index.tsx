import React, { FunctionComponent } from 'react'
import { StyledButton } from '../../styles/Button.styled'

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
    <StyledButton main={main} onClick={() => onClick()} disabled={disabled} {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button
