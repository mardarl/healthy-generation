import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
import { getRecipes } from '../../api/recipes'
import { updateUser } from '../../api/users'
import { RecipeList, RecipePageProps } from '../../common/types'
import { ButtonsContainer, RecipeListContainer, RecipeTitle, SearchContainer } from '../../styles/RecipeList.styled'
import Input from '../../ui-components/Input'
import LoadingScreen from '../LoadingScreen'
import { HiOutlineSearch } from 'react-icons/hi'
import Button from '../../ui-components/Button'
import { RoutePaths } from '../../routes/routePaths'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../common/hooks/useUser'
import { useMutation, useQuery } from 'react-query'
import { useAPIError } from '../../common/hooks/useAPIError'

export const withRecipes = (WrappedComponent: FunctionComponent<RecipePageProps>, isFavourite: boolean) => {
  const WithRecipes = (props: any) => {
    const navigate = useNavigate()
    const { user, setUser } = useUser()
    const { addError } = useAPIError()

    const [currentPage, setCurrentPage] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>('')
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

    const {
      data: recipes,
      isFetching: isRecipesLoading,
      refetch,
    } = useQuery<RecipeList | null>([['recipes']], async () =>
      isFavourite && user
        ? await getRecipes({ is_favourite: true, user_id: user.id, page: currentPage + 1, search: searchText })
        : await getRecipes({ page: currentPage + 1, search: searchText })
    )

    const { mutateAsync: update, isLoading: isUpdateLoading } = useMutation({
      mutationFn: updateUser,
      onError: (err: Error) => addError(err?.message),
    })

    const handleFavouriteChange = async (e: MouseEvent<SVGElement, MouseEvent>, recipeId: string) => {
      e.stopPropagation()
      if (user && recipeId) {
        const newFavs = user.favouriteRecipes.includes(recipeId)
          ? user.favouriteRecipes.filter((item) => item !== recipeId)
          : [...user.favouriteRecipes, recipeId]
        const updatedUser = await update({ ...user, favouriteRecipes: newFavs })
        setUser(updatedUser)
        refetch()
      }
    }

    useEffect(() => {
      refetch()
    }, [currentPage, searchText])

    useEffect(() => {
      setIsLoading(isRecipesLoading || isUpdateLoading)
    }, [isRecipesLoading, isUpdateLoading])

    return (
      <RecipeListContainer>
        <RecipeTitle>
          <span>{isFavourite ? 'favourite recipes' : 'all recipes'}</span>
          <ButtonsContainer>
            <SearchContainer>
              {isSearchOpen && <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} autoFocus />}
              <HiOutlineSearch onClick={() => setIsSearchOpen(!isSearchOpen)} />
            </SearchContainer>
            <Button onClick={() => navigate(RoutePaths.NEW_RECIPE)}>add new one</Button>
          </ButtonsContainer>
        </RecipeTitle>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          recipes && (
            <WrappedComponent
              recipes={recipes}
              handleFavouriteChange={handleFavouriteChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              searchText={searchText}
              setSearchText={setSearchText}
              {...props}
            />
          )
        )}
      </RecipeListContainer>
    )
  }

  return WithRecipes
}
