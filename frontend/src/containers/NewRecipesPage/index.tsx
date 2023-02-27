import React, { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getProducts } from '../../api/products'
import { createRecipe } from '../../api/recipes'
import { getRecipeTypes } from '../../api/recipeTypes'
import { routeWithParams } from '../../common/helpers'
import { Ingredient, NameSimple, Product, Recipe } from '../../common/types'
import { RecipeForm } from '../../components/RecipeForm'

import { RoutePaths } from '../../routes/routePaths'

import Button from '../../ui-components/Button'
import { useUser } from '../../UserContext'

const NewRecipesPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const [recipeTypes, setRecipeTypes] = useState<Array<NameSimple> | null>(null)
  const [products, setProducts] = useState<Array<Product> | null>(null)

  const fetchRecipeData = async () => {
    setRecipeTypes(await getRecipeTypes())
    setProducts(await getProducts())
  }

  const onSubmit = async (values: Recipe) => {
    const amount = values.ingredients.reduce(
      (sum: number, ingredient: Ingredient) => sum + Math.round(ingredient.amount),
      0
    )
    const carbs = values.ingredients.reduce((sum: number, ingredient: Ingredient) => sum + ingredient.carbs, 0)
    const proteins = values.ingredients.reduce((sum: number, ingredient: Ingredient) => sum + ingredient.proteins, 0)
    const fats = values.ingredients.reduce((sum: number, ingredient: Ingredient) => sum + ingredient.fats, 0)
    const calories = values.ingredients.reduce((sum: number, ingredient: Ingredient) => sum + ingredient.calories, 0)
    if (user) {
      const newRecipe = await createRecipe({
        name: values.name,
        authorId: user.id,
        ingredients: values.ingredients || [],
        steps: values.steps || [],
        posibleAllergies: values.posibleAllergies || [],
        recipeTypes: values.recipeTypes || [],
        picturePath: values.picturePath,
        cookingTime: values.cookingTime,
        totalCarbs: Math.round((carbs * 100) / amount),
        totalProteins: Math.round((proteins * 100) / amount),
        totalFats: Math.round((fats * 100) / amount),
        totalCalories: Math.round((calories * 100) / amount),
      })
      navigate(routeWithParams(RoutePaths.RECIPE, { recipeId: newRecipe.id }))
    }
  }

  useEffect(() => {
    fetchRecipeData()
  }, [])

  return (
    <div className='NewRecipesPage'>
      <p>new recipe page</p>
      <Button onClick={() => navigate(RoutePaths.ALL_RECIPES)}>back</Button>
      <Button onClick={() => navigate(RoutePaths.ALL_RECIPES)}>save</Button>
      {recipeTypes && products && (
        <RecipeForm isNew recipeTypes={recipeTypes} onFormSubmit={onSubmit} products={products} />
      )}
    </div>
  )
}

export default NewRecipesPage
