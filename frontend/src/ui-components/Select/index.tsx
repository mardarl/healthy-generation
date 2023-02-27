import React, { useState, useRef, useEffect } from 'react'
import { NameSimple } from '../../common/types'

type SelectProps = {
  options: Array<NameSimple>
  onSelect: (id: string) => void
  selected?: string
}

export const Select = (props: SelectProps) => {
  const { options, onSelect, selected } = props
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(selected)
  const ref = useRef<HTMLDivElement>(null)

  // const onSelectOption = (id: string) => {
  //   selected?.includes(id) ? onSelect([...selected.filter((item) => item !== id)]) : onSelect([...(selected || []), id])
  // }

  const onSelectOption = (item: NameSimple) => {
    if (item) {
      setValue(item.name)
      onSelect(item.id)
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

  // const value = selected ? options.find((item) => item.id === selected)?.name : 'select'
  // console.log('selected', selected)

  return (
    <div className='dropdown-container' ref={ref}>
      <p className='dropdown-btn' onClick={toggleSelect}>
        {value || 'select'}
      </p>
      {/* <input value={selected} /> */}
      {isOpen && (
        <ul className='dropdown-menu' style={{ backgroundColor: 'gray', cursor: 'pointer' }}>
          {options.map((option) => (
            <li
              onClick={() => onSelectOption(option)}
              key={option.id}
              // style={{ color: selected && selected.includes(option.id) ? 'red' : 'black' }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
