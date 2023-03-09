import React, { useState, useRef, useEffect } from 'react'
import { NameSimple } from '../../common/types'
import { NoResults, StyledSelect, StyledSelectBody } from '../../styles/Select.styled'
import Input from '../Input'

type SelectProps = {
  options: Array<NameSimple>
  onSelect: (id: string) => void
  selected?: string
  withSearch?: boolean
}

export const Select = (props: SelectProps) => {
  const { options, onSelect, selected = null, withSearch = false } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
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
        setSearchText('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const value = selected ? options.find((item) => item.id === selected)?.name : 'select'
  const filteredOptions = searchText
    ? options.filter((item) => item.name.toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase()))
    : options

  return (
    <StyledSelect selected={!!selected} ref={ref}>
      <span onClick={toggleSelect}>{value}</span>
      {isOpen && (
        <StyledSelectBody>
          {withSearch && (
            <Input
              placeholder={'search'}
              onClick={(e) => e.stopPropagation()}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
          {filteredOptions.map((option) => (
            <span onClick={() => onSelectOption(option)} key={option.id}>
              {option.name}
            </span>
          ))}
          {!filteredOptions.length && <NoResults>{'no results'}</NoResults>}
        </StyledSelectBody>
      )}
    </StyledSelect>
  )
}
