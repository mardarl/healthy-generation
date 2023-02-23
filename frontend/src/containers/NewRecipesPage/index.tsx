import React, { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import { RoutePaths } from '../../routes/routePaths'

import Button from '../../ui-components/Button'

const NewRecipesPage: FunctionComponent = () => {
  const navigate = useNavigate()

  return (
    <div className='NewRecipesPage'>
      <p>new recipe page</p>
      <Button onClick={() => navigate(RoutePaths.ALL_RECIPES)}>back</Button>
      <Button onClick={() => navigate(RoutePaths.ALL_RECIPES)}>save</Button>
    </div>
  )
}

export default NewRecipesPage
