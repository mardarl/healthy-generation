import { NameSimple } from '../../common/types'
import { StyledLabelSelector, LabelOption } from '../../styles/LabelSelector.styled'

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

  const displayOptions = isEdit ? options : selected

  return (
    <StyledLabelSelector isEdit={isEdit}>
      {displayOptions?.map((option) => (
        <LabelOption
          isEdit={isEdit}
          selected={(selected && selected.filter((item) => item.id === option.id).length > 0) || false}
          onClick={() => onSelectOption(option)}
          key={option.id}
        >
          <span>{option.name}</span>
        </LabelOption>
      ))}
    </StyledLabelSelector>
  )
}
