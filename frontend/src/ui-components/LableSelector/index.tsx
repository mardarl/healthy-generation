import { NameSimple } from '../../common/types'

type SelectProps = {
  options: Array<NameSimple>
  onSelect: (options: Array<NameSimple>) => void
  selected: Array<NameSimple> | null
  isEdit: boolean
}

export const LabelSelect = (props: SelectProps) => {
  const { isEdit, options, onSelect, selected } = props

  const onSelectOption = (selectedItem: NameSimple) => {
    selected && selected?.filter((item) => item.id === selectedItem.id).length
      ? onSelect([...selected.filter((item) => item.id !== selectedItem.id)])
      : onSelect([...(selected || []), selectedItem])
  }

  return (
    <div>
      {isEdit ? (
        <div style={{ display: 'flex' }}>
          {options.map((option) => (
            <span
              onClick={() => onSelectOption(option)}
              key={option.id}
              style={{
                color: selected && selected?.filter((item) => item.id === option.id).length ? 'red' : 'black',
                display: 'block',
                marginLeft: '10px',
              }}
            >
              {option.name}
            </span>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          {selected &&
            selected.map((option) => (
              <span
                onClick={() => onSelectOption(option)}
                key={option.id}
                style={{
                  color: 'red',
                  display: 'block',
                  marginLeft: '10px',
                }}
              >
                {option.name}
              </span>
            ))}
        </div>
      )}
    </div>
  )
}
