import React, { useState, useRef, useEffect } from 'react'
import { NameSimple } from '../../common/types'
import { StyledSelect, StyledSelectBody } from '../../styles/Select.styled'

type SelectProps = {
  options: Array<NameSimple>
  onSelect: (id: string) => void
  selected?: string
}

export const Select = (props: SelectProps) => {
  const { options, onSelect, selected = null } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const onSelectOption = (item: NameSimple) => {
    if (item) {
      onSelect(item.id)
      toggleSelect()
    }
  }

  const toggleSelect = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const value = selected ? options.find((item) => item.id === selected)?.name : 'select'

  return (
    <StyledSelect selected={!!selected} ref={ref}>
      <span onClick={toggleSelect}>{value}</span>
      {isOpen && (
        <StyledSelectBody>
          {options.map((option) => (
            <span onClick={() => onSelectOption(option)} key={option.id}>
              {option.name}
            </span>
          ))}
        </StyledSelectBody>
      )}
    </StyledSelect>
  )
}
