import React, { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { convertRecipeName, routeWithParams } from '../../common/helpers'
import { RecipePageProps } from '../../common/types'
import { RoutePaths } from '../../routes/routePaths'
import {
  RecipeList,
  Recipe,
  RecipeName,
  RecipeHeader,
  RecipeContent,
  RecipeTime,
  RecipeCal,
} from '../../styles/RecipeList.styled'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { useUser } from '../../common/hooks/useUser'
import Pagination from '../../components/Pagination'

const AllRecipesPage: FunctionComponent<RecipePageProps> = (props: RecipePageProps) => {
  const {
    recipes: { recipes, limit, totalCount },
    handleFavouriteChange,
    currentPage,
    setCurrentPage,
  } = props
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <>
      <RecipeList>
        {user &&
          recipes.length > 0 &&
          recipes.map((recipe) => {
            const imgSrc = recipe?.picturePath
              ? `http://localhost:8000/assets/${recipe?.picturePath}`
              : 'assets/default-2.jpg'
            return (
              <Recipe
                key={recipe.id}
                onClick={() => navigate(routeWithParams(RoutePaths.RECIPE, { recipeId: recipe.id }))}
              >
                <img src={imgSrc} alt='' />
                <RecipeContent>
                  <RecipeHeader>
                    <RecipeName>
                      <p>{convertRecipeName(recipe.name)[0]}</p>
                      <span>{convertRecipeName(recipe.name)[1]}</span>
                    </RecipeName>
                    {user.favouriteRecipes.includes(recipe.id) ? (
                      <HiHeart onClick={(e) => handleFavouriteChange(e, recipe.id)} />
                    ) : (
                      <HiOutlineHeart onClick={(e) => handleFavouriteChange(e, recipe.id)} />
                    )}
                  </RecipeHeader>
                  <RecipeTime>{`time ${recipe.cookingTime}m`}</RecipeTime>
                  <RecipeCal>{`${recipe.totalCalories} cal`}</RecipeCal>
                </RecipeContent>
              </Recipe>
            )
          })}
      </RecipeList>
      <Pagination pagesCount={Math.ceil(totalCount / limit)} currentPage={currentPage} onChange={setCurrentPage} />
    </>
  )
}

export default AllRecipesPage
