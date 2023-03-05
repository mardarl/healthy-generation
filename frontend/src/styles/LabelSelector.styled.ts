import styled from 'styled-components'

type LabelSelectortProps = {
  isEdit?: boolean
}

type LabelOptionProps = {
  isEdit?: boolean
  selected?: boolean
}

export const StyledLabelSelector = styled.div<LabelSelectortProps>`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 30px;
`

export const StyledLabelOption = styled.div<LabelOptionProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  width: fit-content;
  cursor: ${({ isEdit }) => (isEdit ? 'pointer' : 'default')};
  background: ${({ selected, theme }) => (selected ? theme.colors.border : 'transparent')};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ selected, theme }) => (selected ? theme.colors.container : theme.colors.regularText)};

  span {
    margin: 0;
    font-size: 12px;
  }

  &:hover {
    background: ${({ selected, theme, isEdit }) => (selected && isEdit ? 'transparent' : theme.colors.border)};
    color: ${({ selected, theme, isEdit }) => (selected && isEdit ? theme.colors.regularText : theme.colors.container)};
  }
`
