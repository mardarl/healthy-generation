import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { getProducts } from '../../api/products'
import { deleteRecipe, getRecipe, updateRecipe } from '../../api/recipes'
import { getRecipeTypes } from '../../api/recipeTypes'
import { updateUser } from '../../api/users'
import { Ingredient, NameSimple, Product, Recipe } from '../../common/types'
import { RecipeForm } from '../../components/RecipeForm'

import Button from '../../ui-components/Button'
import { UserContext, useUser } from '../../UserContext'

const RecipePage: FunctionComponent = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const { setUser } = useContext(UserContext)
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isFavourite, setIsFavourite] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [recipeTypes, setRecipeTypes] = useState<Array<NameSimple> | null>(null)
  const [products, setProducts] = useState<Array<Product> | null>(null)

  const fetchData = async (id: string) => {
    setRecipe(await getRecipe(id))
    setRecipeTypes(await getRecipeTypes())
    setProducts(await getProducts())
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
    const amount = values.ingredients.reduce(
      (sum: number, ingredient: Ingredient) => sum + Math.round(ingredient.amount),
      0
    )
    const carbs = values.ingredients.reduce((sum: number, ingredient: Ingredient) => sum + ingredient.carbs, 0)
    const proteins = values.ingredients.reduce((sum: number, ingredient: Ingredient) => sum + ingredient.proteins, 0)
    const fats = values.ingredients.reduce((sum: number, ingredient: Ingredient) => sum + ingredient.fats, 0)
    const calories = values.ingredients.reduce((sum: number, ingredient: Ingredient) => sum + ingredient.calories, 0)
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
        totalCarbs: Math.round((carbs * 100) / amount),
        totalProteins: Math.round((proteins * 100) / amount),
        totalFats: Math.round((fats * 100) / amount),
        totalCalories: Math.round((calories * 100) / amount),
      })
      fetchData(newRecipe.id)
      setIsEdit(false)
    }
  }

  const handleDelete = async () => {
    if (user && recipe) {
      await deleteRecipe(recipe.id)
      navigate(-1)
    }
  }

  useEffect(() => {
    if (recipeId) {
      fetchData(recipeId)
    }
  }, [])

  useEffect(() => {
    if (user && recipeId) {
      setIsFavourite(user.favouriteRecipes.includes(recipeId))
    }
  }, [user])

  return (
    <div className='RecipePage'>
      <p>recipe page</p>
      <Button onClick={() => navigate(-1)}>back</Button>
      <Button onClick={handleDelete}>delete</Button>
      <Button onClick={() => setIsEdit(true)}>edit</Button>
      {recipe && (
        <>
          {isEdit && <Button onClick={() => setIsEdit(false)}>cancel</Button>}
          {isEdit && recipeTypes && products ? (
            <RecipeForm
              isNew={false}
              recipeTypes={recipeTypes}
              onFormSubmit={onSubmit}
              products={products}
              initialRecipeValues={recipe}
            />
          ) : (
            <>
              <h3>{recipe?.name}</h3>
              <div>
                <input type='checkbox' id='fav' name='fav' onClick={handleFavouriteChange} checked={isFavourite} />
                <label htmlFor='fav'>favourite</label>
              </div>
              <h4>nutritions:</h4>
              <p>{`time: ${recipe?.cookingTime}`}</p>
              <p>{`calories: ${recipe?.totalCalories}`}</p>
              <p>{`carbs: ${recipe?.totalCarbs}`}</p>
              <p>{`proteins: ${recipe?.totalProteins}`}</p>
              <p>{`fat: ${recipe?.totalFats}`}</p>
              <h4>ingredients:</h4>
              {recipe?.ingredients &&
                recipe?.ingredients.map((ingredient, index) => (
                  <p key={index}>{`${ingredient?.name} ${ingredient?.amount}g`}</p>
                ))}
              <h4>steps:</h4>
              {recipe?.steps && recipe?.steps.map((step, index) => <li key={index}>{step}</li>)}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default RecipePage
