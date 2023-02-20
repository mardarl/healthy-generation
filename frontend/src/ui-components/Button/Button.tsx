import React, { FunctionComponent } from 'react'

export type ButtonProps = {
    onClick?: () => void
    disabled?: boolean
    children: React.ReactNode
}
  
const Button: FunctionComponent<ButtonProps> = ({
    onClick = () => null,
    disabled,
    children,
    ...rest
}) => {
  return (
    <button
        onClick={() => onClick()}
        disabled={disabled}
        {...rest}
    >
        {children}
    </button>
  )
}


export default Button