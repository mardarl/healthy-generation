import React, { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import { RoutePaths } from '../../routes/routePaths'

import Button from '../../ui-components/Button'

const AllRecipesPage: FunctionComponent = () => {
  const navigate = useNavigate()

  return (
    <div className='AllRecipesPage'>
      <p>all recipe page</p>
      <Button onClick={() => navigate(RoutePaths.NEW_RECIPE)}>add new one</Button>
    </div>
  )
}

export default AllRecipesPage
