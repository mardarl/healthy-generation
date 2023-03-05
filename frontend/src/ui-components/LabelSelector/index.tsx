import { NameSimple } from '../../common/types'
import { StyledLabelSelector, StyledLabelOption } from '../../styles/LabelSelector.styled'

type SelectProps = {
  options: Array<NameSimple>
  onSelect?: (options: Array<NameSimple>) => void
  selected: Array<NameSimple> | null
  isEdit?: boolean
}

export const LabelSelector = (props: SelectProps) => {
  const { isEdit = false, options, onSelect = () => {}, selected } = props

  const onSelectOption = (selectedItem: NameSimple) => {
    selected && selected?.filter((item) => item.id === selectedItem.id).length
      ? onSelect([...selected.filter((item) => item.id !== selectedItem.id)])
      : onSelect([...(selected || []), selectedItem])
  }

  return (
    <>
      {isEdit ? (
        <StyledLabelSelector isEdit={true}>
          {options.map((option) => (
            <StyledLabelOption
              isEdit={true}
              selected={(selected && selected.filter((item) => item.id === option.id).length > 0) || false}
              onClick={() => onSelectOption(option)}
              key={`edit${option.id}`}
            >
              <span>{option.name}</span>
            </StyledLabelOption>
          ))}
        </StyledLabelSelector>
      ) : (
        <StyledLabelSelector style={{ display: 'flex' }}>
          {selected &&
            selected.map((option) => (
              <StyledLabelOption isEdit={false} selected={true} key={option.id}>
                <span>{option.name}</span>
              </StyledLabelOption>
            ))}
        </StyledLabelSelector>
      )}
    </>
  )
}
