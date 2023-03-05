import React, { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { convertRecipeName, getRandomInt, routeWithParams } from '../../common/helpers'
import { RecipePageProps } from '../../common/types'

import { RoutePaths } from '../../routes/routePaths'
import {
  StyledRecipeList,
  StyledRecipeTitle,
  StyledRecipeListContainer,
  StyledRecipe,
  StyledRecipeName,
  StyledRecipeHeader,
  StyledRecipeContent,
  StyledRecipeTime,
  StyledRecipeCal,
} from '../../styles/RecipeList.styled'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'

import Button from '../../ui-components/Button'
import { useUser } from '../../UserContext'

const AllRecipesPage: FunctionComponent<RecipePageProps> = (props: RecipePageProps) => {
  const {
    recipes: { recipes },
  } = props
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <StyledRecipeListContainer>
      <StyledRecipeTitle>
        <span>all recipes</span>
        <Button onClick={() => navigate(RoutePaths.NEW_RECIPE)}>add new one</Button>
      </StyledRecipeTitle>
      <StyledRecipeList>
        {user &&
          recipes.length > 0 &&
          recipes.map((recipe) => {
            const randomNumber = getRandomInt(3)
            const imgSrc = recipe?.picturePath
              ? `http://localhost:8000/assets/${recipe?.picturePath}`
              : `assets/default-${randomNumber}.jpg`
            return (
              <StyledRecipe
                key={recipe.id}
                onClick={() => navigate(routeWithParams(RoutePaths.RECIPE, { recipeId: recipe.id }))}
              >
                <img src={imgSrc} alt='' />
                <StyledRecipeContent>
                  <StyledRecipeHeader>
                    <StyledRecipeName>
                      <p>{convertRecipeName(recipe.name)[0]}</p>
                      <span>{convertRecipeName(recipe.name)[1]}</span>
                    </StyledRecipeName>
                    {user.favouriteRecipes.includes(recipe.id) ? <HiHeart /> : <HiOutlineHeart />}
                  </StyledRecipeHeader>
                  <StyledRecipeTime>{`time ${recipe.cookingTime}m`}</StyledRecipeTime>
                  <StyledRecipeCal>{`${recipe.totalCalories} cal`}</StyledRecipeCal>
                </StyledRecipeContent>
              </StyledRecipe>
            )
          })}
      </StyledRecipeList>
    </StyledRecipeListContainer>
  )
}

export default AllRecipesPage
