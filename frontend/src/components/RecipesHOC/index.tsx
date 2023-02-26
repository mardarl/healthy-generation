import React, { FunctionComponent, useEffect, useState } from 'react'
import { getRecipes } from '../../api/recipes'
import { RecipeList, RecipePageProps } from '../../common/types'
import { useUser } from '../../UserContext'

export const withRecipes = (WrappedComponent: FunctionComponent<RecipePageProps>, isFavourite: boolean) => {
  const WithRecipes = (props: any) => {
    const [recipes, setRecipes] = useState<RecipeList | null>(null)
    const { user } = useUser()

    const fetchData = async () => {
      if (isFavourite && user) {
        setRecipes(await getRecipes({ is_favourite: true, user_id: user.id }))
      } else {
        setRecipes(await getRecipes())
      }
    }

    useEffect(() => {
      if (user?.id) {
        fetchData()
      }
    }, [user])

    return recipes && <WrappedComponent recipes={recipes} {...props} />
  }

  return WithRecipes
}
