import React, { useState, useRef, useEffect } from 'react'
import { List, NameSimple, QueryParams } from '../../common/types'
import {
  NoResults,
  StyledSelect,
  StyledSelectBody,
  StyledSearchContainer,
  StyledSelectBodyItem,
  StyledIconsContainer,
  StyledInfiniteScroll,
} from '../../styles/Select.styled'
import Button from '../Button'
import Input from '../Input'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AxiosRequestConfig } from 'axios'

type SelectProps = {
  options: Array<NameSimple>
  onSelect: (id: string) => void
  selected?: string
  withSearch?: boolean
  withAddButton?: boolean
  onAdd?: () => void
  withButtons?: boolean
  onEdit?: (value: any) => void
  onDelete?: (id: string) => void
  getOptions: (params?: QueryParams | undefined, config?: AxiosRequestConfig<any> | undefined) => Promise<any>
  arrayName: string
}

export const Select = (props: SelectProps) => {
  const {
    options,
    onSelect,
    selected = null,
    withSearch = false,
    withAddButton = false,
    onAdd = () => {},
    withButtons = false,
    onEdit = () => {},
    onDelete = () => {},
    getOptions,
    arrayName,
  } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [items, setItems] = useState<NameSimple[]>([])
  const [allItems, setAllItems] = useState<List | null>(null)
  const [page, setPage] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  const onSelectOption = (item: NameSimple) => {
    if (item) {
      onSelect(item.id)
      toggleSelect()
    }
  }

  const onButtonClick = (action: () => void) => {
    action()
    toggleSelect()
  }

  const onListItemChange = (action: (value: any) => void, value: any) => {
    action(value)
    toggleSelect()
    fetchMoreData(1)
  }

  const toggleSelect = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
        setSearchText('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  useEffect(() => {
    if (isOpen || searchText) {
      fetchMoreData(1)
    }
  }, [isOpen, searchText])

  const fetchMoreData = async (page: number) => {
    setPage(page)
    const resp = await getOptions({ page, search: searchText, limit: 5 })
    setAllItems(resp)
    setItems(page === 1 ? resp[arrayName] : [...items, ...resp[arrayName]])
  }

  const value = selected ? options.find((item) => item.id === selected)?.name : 'select'

  return (
    <StyledSelect selected={!!selected} ref={ref}>
      <span onClick={toggleSelect}>{value}</span>
      {isOpen && (
        <>
          <StyledSelectBody>
            <>
              {withSearch && (
                <StyledSearchContainer withButton={withAddButton}>
                  <Input
                    placeholder={'search'}
                    onClick={(e) => e.stopPropagation()}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  {withAddButton && <Button onClick={() => onButtonClick(onAdd)}>+</Button>}
                </StyledSearchContainer>
              )}
              {!items.length && <NoResults>{'no results'}</NoResults>}
            </>
          </StyledSelectBody>
          {items.length > 0 && (
            <StyledInfiniteScroll withSearch={withSearch}>
              <InfiniteScroll
                dataLength={items.length}
                next={() => fetchMoreData(page + 1)}
                hasMore={!!allItems && allItems?.totalCount > items.length}
                loader={<p>{'loading...'}</p>}
                height={333}
              >
                {items.map((item, index) => (
                  <StyledSelectBodyItem>
                    <span onClick={() => onSelectOption(item)} key={item.id}>
                      {item.name}
                    </span>
                    {withButtons && (
                      <StyledIconsContainer>
                        <AiOutlineEdit onClick={() => onListItemChange(onEdit, item)} />
                        <AiOutlineDelete onClick={() => onListItemChange(onDelete, item.id)} />
                      </StyledIconsContainer>
                    )}
                  </StyledSelectBodyItem>
                ))}
              </InfiniteScroll>
            </StyledInfiniteScroll>
          )}
        </>
      )}
    </StyledSelect>
  )
}
