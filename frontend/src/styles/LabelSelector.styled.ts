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
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-bottom: 1.875rem;
`

export const StyledLabelOption = styled.div<LabelOptionProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 1.25rem;
  width: fit-content;
  cursor: ${({ isEdit }) => (isEdit ? 'pointer' : 'default')};
  background: ${({ selected, theme }) => (selected ? theme.colors.border : 'transparent')};
  border: 0.063rem solid ${({ theme }) => theme.colors.border};
  color: ${({ selected, theme }) => (selected ? theme.colors.container : theme.colors.regularText)};

  span {
    margin: 0;
    font-size: 0.75rem;
  }

  &:hover {
    background: ${({ selected, theme, isEdit }) => (selected && isEdit ? 'transparent' : theme.colors.border)};
    color: ${({ selected, theme, isEdit }) => (selected && isEdit ? theme.colors.regularText : theme.colors.container)};
  }
`
