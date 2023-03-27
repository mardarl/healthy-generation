import React, { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { getProducts } from '../../api/products'
import { deleteRecipe as deleteResipeRequest, getRecipe, updateRecipe } from '../../api/recipes'
import { getRecipeTypes } from '../../api/recipeTypes'
import { updateUser as updateUserRequest } from '../../api/users'
import { NameSimple, ProductList, Recipe } from '../../common/types'
import { RecipeForm } from '../../components/RecipeForm'
import {
  StyledButtonsContainer,
  StyledHeader,
  StyledRecipeStep,
  StyledRecipeText,
  StyledRecipeTitle,
  StyledRecipePage,
  StyledRecipePageContent,
  StyledNestedText,
} from '../../styles/RecipePage.styled'
import Button from '../../ui-components/Button'
import { useUser } from '../../common/hooks/useUser'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { LabelSelector } from '../../ui-components/LabelSelector'
import { calculateTotalNutrient, getRandomInt } from '../../common/helpers'
import LoadingScreen from '../../components/LoadingScreen'
import { RoutePaths } from '../../routes/routePaths'
import DeleteModal from '../../components/DeleteModal'
import { useMutation, useQuery } from 'react-query'
import { useAPIError } from '../../common/hooks/useAPIError'

const RecipePage: FunctionComponent = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const { setUser } = useUser()
  const { addError } = useAPIError()

  const [loading, setLoading] = useState<boolean>(false)
  const [isFavourite, setIsFavourite] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [imgSrc, setImgSrc] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const {
    data: recipe,
    isLoading: isRecipeLoading,
    refetch,
  } = useQuery<Recipe | null>([['recipe'], recipeId], async () => (recipeId ? await getRecipe(recipeId) : null))
  const { data: recipeTypes, isLoading: isRecipeTypesLoading } = useQuery<Array<NameSimple> | null>(
    ['recipeTypes'],
    async () => await getRecipeTypes()
  )
  const { data: products, isLoading: isProductsLoading } = useQuery<ProductList | null>(
    ['products'],
    async () => await getProducts()
  )

  const { mutateAsync: update, isLoading: isUpdateLoading } = useMutation({
    mutationFn: updateRecipe,
    onError: (err: Error) => addError(err?.message),
  })
  const { mutateAsync: deleteRecipe, isLoading: isDeleteLoading } = useMutation({
    mutationFn: deleteResipeRequest,
    onError: (err: Error) => addError(err?.message),
  })
  const { mutateAsync: updateUser, isLoading: isUpdateUserLoading } = useMutation({
    mutationFn: updateUserRequest,
    onError: (err: Error) => addError(err?.message),
  })

  const handleFavouriteChange = async () => {
    if (user && recipe) {
      const newFavs = isFavourite
        ? user.favouriteRecipes.filter((item) => item !== recipe?.id)
        : [...user.favouriteRecipes, recipe?.id]
      const updatedUser = await updateUser({ ...user, favouriteRecipes: newFavs })
      setUser(updatedUser)
      setIsFavourite(updatedUser.favouriteRecipes.includes(recipe.id))
    }
  }

  const onSubmit = async (values: Recipe) => {
    if (user && recipe) {
      await update({
        id: recipe?.id,
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
        isIngredient: values.isIngredient,
      })
      refetch()
      setIsEdit(false)
    }
  }

  const handleDelete = async () => {
    if (user && recipe) {
      await deleteRecipe(recipe.id)
      navigate(RoutePaths.ALL_RECIPES)
    }
  }

  useEffect(() => {
    if (user && recipeId) {
      setIsFavourite(user.favouriteRecipes.includes(recipeId))
    }
  }, [user, recipeId])

  useEffect(() => {
    if (recipe?.picturePath) {
      setImgSrc(`http://localhost:8000/assets/${recipe?.picturePath}`)
    } else {
      const randomNumber = getRandomInt(3)
      setImgSrc(`http://localhost:3001/assets/default-${randomNumber}.jpg`)
    }
  }, [recipe])

  useEffect(() => {
    setLoading(
      isRecipeLoading ||
        isRecipeTypesLoading ||
        isProductsLoading ||
        isUpdateLoading ||
        isDeleteLoading ||
        isUpdateUserLoading
    )
  }, [isRecipeLoading, isRecipeTypesLoading, isProductsLoading, isUpdateLoading, isDeleteLoading, isUpdateUserLoading])

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <StyledRecipePage>
          {recipe && (
            <>
              <img src={imgSrc} alt='' />
              {isEdit && recipeTypes && products ? (
                <StyledRecipePageContent>
                  <RecipeForm
                    isNew={false}
                    recipeTypes={recipeTypes}
                    onFormSubmit={onSubmit}
                    products={products.products}
                    initialRecipeValues={recipe}
                    onCancel={() => setIsEdit(false)}
                  />
                </StyledRecipePageContent>
              ) : (
                <StyledRecipePageContent>
                  <StyledHeader>
                    <span>{recipe?.name}</span>
                    <StyledButtonsContainer>
                      {isFavourite ? (
                        <HiHeart onClick={handleFavouriteChange} />
                      ) : (
                        <HiOutlineHeart onClick={handleFavouriteChange} />
                      )}
                      <Button onClick={() => setOpen(true)}>delete</Button>
                      <Button onClick={() => setIsEdit(true)}>edit</Button>
                    </StyledButtonsContainer>
                  </StyledHeader>
                  <StyledRecipeTitle>nutritions:</StyledRecipeTitle>
                  <StyledRecipeText>{`time: ${recipe?.cookingTime || 0}m`}</StyledRecipeText>
                  <StyledRecipeText>{`calories: ${recipe?.totalCalories || 0}g`}</StyledRecipeText>
                  <StyledRecipeText>{`carbs: ${recipe?.totalCarbs || 0}g`}</StyledRecipeText>
                  <StyledRecipeText>{`proteins: ${recipe?.totalProteins || 0}g`}</StyledRecipeText>
                  <StyledRecipeText>{`fat: ${recipe?.totalFats || 0}g`}</StyledRecipeText>
                  {recipe?.recipeTypes && recipe?.recipeTypes.length > 0 && (
                    <>
                      <StyledRecipeTitle>recipe types:</StyledRecipeTitle>
                      <LabelSelector options={recipeTypes || []} onSelect={() => {}} selected={recipe?.recipeTypes} />
                    </>
                  )}
                  {recipe?.ingredients.length > 0 && (
                    <>
                      <StyledRecipeTitle>ingredients:</StyledRecipeTitle>
                      {recipe?.ingredients.map((ingredient, index) => (
                        <>
                          <StyledRecipeText key={index}>
                            {`${ingredient?.name} - ${ingredient?.amount}g`}
                          </StyledRecipeText>
                          <>
                            {ingredient?.recipe &&
                              ingredient?.recipe?.ingredients &&
                              ingredient?.recipe?.ingredients.map((i, index) => (
                                <StyledNestedText key={index}>{`${i?.name} - ${i?.amount}g`}</StyledNestedText>
                              ))}
                          </>
                        </>
                      ))}
                    </>
                  )}
                  {recipe?.steps && recipe?.steps.length > 0 && (
                    <>
                      <StyledRecipeTitle>steps:</StyledRecipeTitle>
                      {recipe?.steps.map((step, index) => (
                        <StyledRecipeStep key={index}>{step}</StyledRecipeStep>
                      ))}
                    </>
                  )}
                </StyledRecipePageContent>
              )}
            </>
          )}
        </StyledRecipePage>
      )}
      <DeleteModal open={open} onClose={() => setOpen(false)} onDelete={handleDelete} />
    </>
  )
}

export default RecipePage
