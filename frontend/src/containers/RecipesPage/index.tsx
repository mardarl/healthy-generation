import React, { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'
import { RecipePageProps } from '../../common/types'

import { RoutePaths } from '../../routes/routePaths'

import Button from '../../ui-components/Button'

const AllRecipesPage: FunctionComponent<RecipePageProps> = (props: RecipePageProps) => {
  const {
    recipes: { recipes },
  } = props
  const navigate = useNavigate()

  return (
    <div className='AllRecipesPage'>
      <p>all recipe page</p>
      <Button onClick={() => navigate(RoutePaths.NEW_RECIPE)}>add new one</Button>
      <ul>{recipes.length > 0 && recipes.map((recipe) => <li key={recipe.id}>{recipe.name}</li>)}</ul>
    </div>
  )
}

export default AllRecipesPage
