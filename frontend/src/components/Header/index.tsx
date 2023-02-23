import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { RoutePaths } from '../../routes/routePaths'

const Header: FunctionComponent = () => {
  return (
    <div className='Header' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <nav style={{ width: '100%', display: 'flex' }}>
        <Link style={{ width: '60%' }} to={RoutePaths.HOME}>
          HGR
        </Link>
        <Link style={{ width: '20%' }} to={RoutePaths.PROFILE}>
          profile
        </Link>
        <Link style={{ width: '20%' }} to={RoutePaths.FAVOURITE_RECIPES}>
          favourite recipes
        </Link>
        <Link style={{ width: '20%' }} to={RoutePaths.ALL_RECIPES}>
          all recipes
        </Link>
      </nav>
    </div>
  )
}

export default Header