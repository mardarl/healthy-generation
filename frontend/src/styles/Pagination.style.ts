import styled from 'styled-components'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { lineUpNoOpacity } from './animatons'

type ArrowProps = {
  disabled?: boolean
}

export const StyledPaginator = styled.div<ArrowProps>`
  display: grid;
  margin: 0 auto;
  grid-template-columns: 3rem auto 3rem;
  column-gap: 1.5rem;
  align-content: center;
  user-select: none;
  justify-content: space-around;
  width: fit-content;
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.container};
  margin-top: 3rem;
  animation: 4s ${lineUpNoOpacity} ease-out;
`
export const StyledArrowLeft = styled(HiOutlineChevronLeft)<ArrowProps>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.placeholder : theme.colors.text)};
  padding: 1rem;
  width: 3rem;
  height: 3rem;
`
export const StyledArrowRight = styled(HiOutlineChevronRight)<ArrowProps>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.placeholder : theme.colors.text)};
  padding: 1rem;
  width: 3rem;
  height: 3rem;
`

export const StyledCounterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 3rem);
  column-gap: 0rem;
  grid-auto-flow: column;
`

export const StyledCounterItem = styled.span`
  font: 0.75rem;
  color: ${({ theme }) => theme.colors.disabledText};
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
`
export const StyledCounterEmptyItem = styled(StyledCounterItem)`
  color: ${({ theme }) => theme.colors.disabledText};
  cursor: default;
`

export const StyledCounterItemSelected = styled(StyledCounterItem)`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.active};
  border: 0.063rem solid ${({ theme }) => theme.colors.border};
`
