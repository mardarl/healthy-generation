import React, { FunctionComponent, memo } from 'react'
import {
  StyledArrowLeft,
  StyledArrowRight,
  StyledCounterContainer,
  StyledCounterEmptyItem,
  StyledCounterItem,
  StyledCounterItemSelected,
  StyledPaginator,
} from '../../styles/Pagination.style'

type PaginationProps = {
  pagesCount: number
  currentPage: number
  onChange: (nextPage: number) => void
}

type Range = {
  start: number
  end: number
}

const DEFAULT_RANGE_SIZE = 6
const EMPTY_VALUE = '...'

const getRange = (currentPage = 0, pageCount: number): Range => {
  let rangeExpandLen = 0
  let start = currentPage
  let end = currentPage
  while (rangeExpandLen < DEFAULT_RANGE_SIZE) {
    let isExpanded = false
    if (start > 0) {
      start--
      rangeExpandLen++
      isExpanded = true
    }
    if (rangeExpandLen < DEFAULT_RANGE_SIZE && end < pageCount - 1) {
      end++
      rangeExpandLen++
      isExpanded = true
    }
    if (!isExpanded) {
      break
    }
  }
  return { start, end }
}

const getPages = (start: number, rangeStart: number, rangeEnd: number, end: number): Array<number | string> => {
  if (end - start + 1 <= DEFAULT_RANGE_SIZE) {
    return new Array(end - start + 1).fill(null).map((skipVal: null, index) => index)
  }
  const pages: Array<number | string> = []
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }
  const FIRST_PAGE = 0
  const SECOND_PAGE = 1
  const SECOND_LAST_PAGE = pages.length - 2
  const LAST_PAGE = pages.length - 1

  pages[FIRST_PAGE] = start
  pages[LAST_PAGE] = end
  if (pages[SECOND_PAGE] !== start + 1) {
    pages[SECOND_PAGE] = EMPTY_VALUE
  }
  if (pages[SECOND_LAST_PAGE] !== end - 1) {
    pages[SECOND_LAST_PAGE] = EMPTY_VALUE
  }
  return pages
}

const Pagination: FunctionComponent<PaginationProps> = ({ pagesCount, currentPage, onChange }) => {
  const range = getRange(currentPage, pagesCount)
  const start = 0
  const end = pagesCount - 1
  const pages = getPages(start, range.start, range.end, end)
  const onPageChange = (pageValue: number) => {
    if (pageValue === currentPage) {
      return
    }
    let newPageValue
    if (pageValue < start) {
      newPageValue = start
    } else if (pageValue >= end) {
      newPageValue = end
    } else {
      newPageValue = pageValue
    }
    onChange(newPageValue)
  }

  if (pagesCount <= 1) {
    return null
  }

  return (
    <StyledPaginator>
      <StyledArrowLeft disabled={currentPage === start} onClick={() => onPageChange(currentPage - 1)} />
      <StyledCounterContainer>
        {pages.map((value: string | number, index: number) => {
          if (value === EMPTY_VALUE) {
            return <StyledCounterEmptyItem>{value}</StyledCounterEmptyItem>
          }
          if (typeof value === 'number') {
            return (
              <>
                {value === currentPage ? (
                  <StyledCounterItemSelected key={index} onClick={() => onPageChange(value)}>
                    {value + 1}
                  </StyledCounterItemSelected>
                ) : (
                  <StyledCounterItem key={index} onClick={() => onPageChange(value)}>
                    {value + 1}
                  </StyledCounterItem>
                )}
              </>
            )
          }
          return null
        })}
      </StyledCounterContainer>
      <StyledArrowRight disabled={currentPage === end} onClick={() => onPageChange(currentPage + 1)} />
    </StyledPaginator>
  )
}

export default memo(Pagination)
