import React, { FunctionComponent } from 'react'
import { StyledCheckbox } from '../../styles/Checkbox.styled'

type CheckboxProps = {
  label?: string | React.ReactNode
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
const Checkbox: FunctionComponent<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <StyledCheckbox>
      <input checked={checked} onChange={onChange} type='checkbox' />
      <span>{label}</span>
    </StyledCheckbox>
  )
}

export default Checkbox
