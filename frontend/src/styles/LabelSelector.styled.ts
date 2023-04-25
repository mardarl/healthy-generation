import styled from 'styled-components'
import { lineSideNoOpacity } from './animatons'

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

export const LabelOption = styled.div<LabelOptionProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 1.25rem;
  width: fit-content;
  cursor: ${({ isEdit }) => (isEdit ? 'pointer' : 'default')};
  background: ${({ selected, theme }) => (selected ? theme.colors.border : 'transparent')};
  border: 0.063rem solid ${({ theme }) => theme.colors.border};
  color: ${({ selected, theme }) => (selected ? theme.colors.container : theme.colors.regularText)};
  animation: 2s ${lineSideNoOpacity} ease-out;

  span {
    margin: 0;
    font-size: 0.75rem;
  }

  &:hover {
    box-shadow: ${({ isEdit, theme }) => (isEdit ? `0 0 50px 3px ${theme.colors.regularText}` : 'none')};
  }
`
