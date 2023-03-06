import React, { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getProducts } from '../../api/products'
import { createRecipe } from '../../api/recipes'
import { getRecipeTypes } from '../../api/recipeTypes'
import { calculateTotalNutrient, routeWithParams } from '../../common/helpers'
import { NameSimple, Product, Recipe } from '../../common/types'
import LoadingScreen from '../../components/LoadingScreen'
import { RecipeForm } from '../../components/RecipeForm'
import { RoutePaths } from '../../routes/routePaths'
import { StyledNewRecipePage } from '../../styles/NewRecipePage.styled'
import { useUser } from '../../UserContext'

const NewRecipesPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [recipeTypes, setRecipeTypes] = useState<Array<NameSimple> | null>(null)
  const [products, setProducts] = useState<Array<Product> | null>(null)

  const fetchRecipeData = async () => {
    setRecipeTypes(await getRecipeTypes())
    setProducts(await getProducts())
    setLoading(false)
  }

  const onSubmit = async (values: Recipe) => {
    if (user) {
      setLoading(true)
      const newRecipe = await createRecipe({
        name: values.name,
        authorId: user.id,
        ingredients: values.ingredients || [],
        steps: values.steps || [],
        posibleAllergies: values.posibleAllergies || [],
        recipeTypes: values.recipeTypes || [],
        picturePath: values.picturePath,
        cookingTime: values.cookingTime,
        totalCarbs: calculateTotalNutrient(values.ingredients, 'carbs'),
        totalProteins: calculateTotalNutrient(values.ingredients, 'proteins'),
        totalFats: calculateTotalNutrient(values.ingredients, 'fats'),
        totalCalories: calculateTotalNutrient(values.ingredients, 'calories'),
      })
      setLoading(false)
      navigate(routeWithParams(RoutePaths.RECIPE, { recipeId: newRecipe.id }))
    }
  }

  useEffect(() => {
    fetchRecipeData()
    setLoading(true)
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <StyledNewRecipePage>
          {recipeTypes && products && (
            <RecipeForm
              isNew
              recipeTypes={recipeTypes}
              onFormSubmit={onSubmit}
              products={products}
              onCancel={() => navigate(RoutePaths.ALL_RECIPES)}
            />
          )}
        </StyledNewRecipePage>
      )}
    </>
  )
}

export default NewRecipesPage
