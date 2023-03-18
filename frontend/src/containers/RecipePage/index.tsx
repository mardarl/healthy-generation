import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { getProducts } from '../../api/products'
import { deleteRecipe, getRecipe, updateRecipe } from '../../api/recipes'
import { getRecipeTypes } from '../../api/recipeTypes'
import { updateUser } from '../../api/users'
import { NameSimple, Product, Recipe } from '../../common/types'
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
import { UserContext, useUser } from '../../UserContext'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { LabelSelector } from '../../ui-components/LabelSelector'
import { calculateTotalNutrient, getRandomInt } from '../../common/helpers'
import LoadingScreen from '../../components/LoadingScreen'
import { RoutePaths } from '../../routes/routePaths'
import DeleteModal from '../../components/DeleteModal'

const RecipePage: FunctionComponent = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const { setUser } = useContext(UserContext)

  const [isLoading, setLoading] = useState<boolean>(false)
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isFavourite, setIsFavourite] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [recipeTypes, setRecipeTypes] = useState<Array<NameSimple> | null>(null)
  const [products, setProducts] = useState<Array<Product> | null>(null)
  const [imgSrc, setImgSrc] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const fetchData = async (id: string) => {
    setRecipe(await getRecipe(id))
    setRecipeTypes(await getRecipeTypes())
    const productsList = await getProducts()
    setProducts(productsList.products)
    setLoading(false)
  }

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
    setLoading(true)
    if (user && recipe) {
      const newRecipe = await updateRecipe({
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

      fetchData(newRecipe.id)
      setIsEdit(false)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (user && recipe) {
      await deleteRecipe(recipe.id)
      navigate(RoutePaths.ALL_RECIPES)
    }
  }

  useEffect(() => {
    if (recipeId) {
      setLoading(true)
      fetchData(recipeId)
    }
  }, [])

  useEffect(() => {
    if (user && recipeId) {
      setIsFavourite(user.favouriteRecipes.includes(recipeId))
    }
  }, [user])

  useEffect(() => {
    if (recipe?.picturePath) {
      setImgSrc(`http://localhost:8000/assets/${recipe?.picturePath}`)
    } else {
      const randomNumber = getRandomInt(3)
      setImgSrc(`http://localhost:3001/assets/default-${randomNumber}.jpg`)
    }
  }, [recipe])

  return (
    <>
      {isLoading ? (
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
                    products={products}
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
