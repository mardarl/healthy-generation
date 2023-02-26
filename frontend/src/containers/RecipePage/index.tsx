import React, { FunctionComponent } from 'react'
import { useNavigate } from 'react-router'

import Button from '../../ui-components/Button'

const RecipePage: FunctionComponent = () => {
  const navigate = useNavigate()

  return (
    <div className='RecipePage'>
      <p>recipe page</p>
      <Button onClick={() => navigate(-1)}>back</Button>
    </div>
  )
}

export default RecipePage
