import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
import { getRecipes } from '../../api/recipes'
import { updateUser } from '../../api/users'
import { RecipeList, RecipePageProps } from '../../common/types'
import { useUser } from '../../UserContext'
import LoadingScreen from '../LoadingScreen'

export const withRecipes = (WrappedComponent: FunctionComponent<RecipePageProps>, isFavourite: boolean) => {
  const WithRecipes = (props: any) => {
    const [recipes, setRecipes] = useState<RecipeList | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(false)
    const { user, setUser } = useUser()

    const fetchData = async () => {
      if (isFavourite && user) {
        setRecipes(await getRecipes({ is_favourite: true, user_id: user.id, page: currentPage + 1 }))
        setLoading(false)
      } else {
        setRecipes(await getRecipes({ page: currentPage + 1, limit: 5 }))
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

    return isLoading ? (
      <LoadingScreen />
    ) : (
      recipes && (
        <WrappedComponent
          recipes={recipes}
          handleFavouriteChange={handleFavouriteChange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          {...props}
        />
      )
    )
  }

  return WithRecipes
}
