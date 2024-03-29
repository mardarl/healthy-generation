import React, { FunctionComponent, HTMLProps, memo, Ref } from 'react'
import { StyledInput, Label, InputError } from '../../styles/Input.styled'

export type InputProps = {
  label?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.ChangeEventHandler<HTMLInputElement>
  onKeyPress?: React.DOMAttributes<HTMLInputElement>
  inputRef?: Ref<HTMLInputElement>
  errors?: string
} & Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'onFocus' | 'onBlur'>

const Input: FunctionComponent<InputProps> = ({
  type,
  placeholder,
  label,
  autoComplete = 'on',
  value,
  onChange,
  onFocus,
  onBlur,
  inputRef,
  onKeyPress,
  disabled,
  errors,
  ...rest
}) => {
  return (
    <StyledInput errors={errors} disabled={disabled}>
      {label && <Label>{label}</Label>}
      <input
        autoComplete={autoComplete}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        type={type}
        ref={inputRef}
        onKeyPress={onKeyPress}
        {...rest}
      />
      {errors && <InputError>{errors}</InputError>}
    </StyledInput>
  )
}

export default memo(Input)
