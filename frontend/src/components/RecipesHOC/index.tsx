import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
import { getRecipes } from '../../api/recipes'
import { updateUser } from '../../api/users'
import { RecipeList, RecipePageProps } from '../../common/types'
import {
  StyledButtonsContainer,
  StyledRecipeListContainer,
  StyledRecipeTitle,
  StyledSearchContainer,
} from '../../styles/RecipeList.styled'
import Input from '../../ui-components/Input'
import { useUser } from '../../UserContext'
import LoadingScreen from '../LoadingScreen'
import { HiOutlineSearch } from 'react-icons/hi'
import Button from '../../ui-components/Button'
import { RoutePaths } from '../../routes/routePaths'
import { useNavigate } from 'react-router-dom'

export const withRecipes = (WrappedComponent: FunctionComponent<RecipePageProps>, isFavourite: boolean) => {
  const WithRecipes = (props: any) => {
    const [recipes, setRecipes] = useState<RecipeList | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>('')
    const [isSearchOpen, setIsSearchOpenOpen] = useState<boolean>(false)

    const { user, setUser } = useUser()
    const navigate = useNavigate()

    const fetchData = async () => {
      if (isFavourite && user) {
        setRecipes(
          await getRecipes({ is_favourite: true, user_id: user.id, page: currentPage + 1, search: searchText })
        )
        setLoading(false)
      } else {
        setRecipes(await getRecipes({ page: currentPage + 1, search: searchText }))
        setLoading(false)
      }
    }

    const handleFavouriteChange = async (e: MouseEvent<SVGElement, MouseEvent>, recipeId: string) => {
      e.stopPropagation()
      if (user && recipeId) {
        const newFavs = user.favouriteRecipes.includes(recipeId)
          ? user.favouriteRecipes.filter((item) => item !== recipeId)
          : [...user.favouriteRecipes, recipeId]
        const updatedUser = await updateUser({ ...user, favouriteRecipes: newFavs })
        setUser(updatedUser)
      }
    }

    useEffect(() => {
      if (user?.id) {
        fetchData()
        setLoading(true)
      }
    }, [user, currentPage])

    useEffect(() => {
      if (searchText.length > 0) {
        fetchData()
        setLoading(true)
      }
    }, [searchText])

    return (
      <StyledRecipeListContainer>
        <StyledRecipeTitle>
          <span>{isFavourite ? 'favourite recipes' : 'all recipes'}</span>
          <StyledButtonsContainer>
            <StyledSearchContainer>
              {isSearchOpen && <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} autoFocus />}
              <HiOutlineSearch onClick={() => setIsSearchOpenOpen(!isSearchOpen)} />
            </StyledSearchContainer>
            <Button onClick={() => navigate(RoutePaths.NEW_RECIPE)}>add new one</Button>
          </StyledButtonsContainer>
        </StyledRecipeTitle>
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
      </StyledRecipeListContainer>
    )
  }

  return WithRecipes
}
