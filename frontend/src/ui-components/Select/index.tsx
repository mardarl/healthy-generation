import React, { useState, useRef, useEffect } from 'react'
import { NameSimple } from '../../common/types'

type SelectProps = {
  options: Array<NameSimple>
  onSelect: (options: Array<string>) => void
  selected?: Array<string>
}

export const Select = (props: SelectProps) => {
  const { options, onSelect, selected } = props
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const onSelectOption = (id: string) => {
    selected?.includes(id) ? onSelect([...selected.filter((item) => item !== id)]) : onSelect([...(selected || []), id])
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

  return (
    <div className='dropdown-container' ref={ref}>
      <button className='dropdown-btn' onClick={toggleSelect}>
        Select
      </button>
      {/* <input value={selected} /> */}
      {isOpen && (
        <ul className='dropdown-menu' style={{ backgroundColor: 'gray', cursor: 'pointer' }}>
          {options.map((option) => (
            <li
              onClick={() => onSelectOption(option.id)}
              key={option.id}
              style={{ color: selected && selected.includes(option.id) ? 'red' : 'black' }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
