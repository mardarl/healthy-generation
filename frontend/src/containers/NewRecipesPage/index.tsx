import React, { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getProducts } from '../../api/products'
import { createRecipe } from '../../api/recipes'
import { getRecipeTypes } from '../../api/recipeTypes'
import { calculateTotalAmount, calculateTotalNutrient, routeWithParams } from '../../common/helpers'
import { NameSimple, ProductList, Recipe } from '../../common/types'
import LoadingScreen from '../../components/LoadingScreen'
import { RecipeForm } from '../../components/RecipeForm'
import { RoutePaths } from '../../routes/routePaths'
import { StyledNewRecipePage } from '../../styles/NewRecipePage.styled'
import { useUser } from '../../common/hooks/useUser'
import { useMutation, useQuery } from 'react-query'
import { useAPIError } from '../../common/hooks/useAPIError'

const NewRecipesPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { addError } = useAPIError()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data: recipeTypes, isLoading: isRecipeTypesLoading } = useQuery<Array<NameSimple> | null>(
    ['recipeTypes'],
    async () => await getRecipeTypes()
  )
  const { data: products, isLoading: isProductsLoading } = useQuery<ProductList | null>(
    ['products'],
    async () => await getProducts()
  )

  const { mutateAsync: create, isLoading: isCreateLoading } = useMutation({
    mutationFn: createRecipe,
    onError: (err: Error) => addError(err?.message),
  })

  const onSubmit = async (values: Recipe) => {
    if (user) {
      const totalAmount = calculateTotalAmount(values.ingredients)
      const newRecipe = await create({
        name: values.name,
        authorId: user.id,
        ingredients: values.ingredients || [],
        steps: values.steps || [],
        posibleAllergies: values.posibleAllergies || [],
        recipeTypes: values.recipeTypes || [],
        picturePath: values.picturePath,
        cookingTime: values.cookingTime,
        totalCarbs: calculateTotalNutrient(values.ingredients, 'carbs', totalAmount),
        totalProteins: calculateTotalNutrient(values.ingredients, 'proteins', totalAmount),
        totalFats: calculateTotalNutrient(values.ingredients, 'fats', totalAmount),
        totalCalories: calculateTotalNutrient(values.ingredients, 'calories', totalAmount),
        totalAmount,
        isIngredient: values.isIngredient,
      })
      navigate(routeWithParams(RoutePaths.RECIPE, { recipeId: newRecipe.id }))
    }
  }

  useEffect(() => {
    setIsLoading(isRecipeTypesLoading || isCreateLoading || isProductsLoading)
  }, [isRecipeTypesLoading, isCreateLoading, isProductsLoading])

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <StyledNewRecipePage>
          <RecipeForm
            isNew
            recipeTypes={recipeTypes}
            products={products?.products}
            onFormSubmit={onSubmit}
            onCancel={() => navigate(RoutePaths.ALL_RECIPES)}
          />
        </StyledNewRecipePage>
      )}
    </>
  )
}

export default NewRecipesPage
