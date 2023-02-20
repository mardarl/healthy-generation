import React, { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import AllRecipesPage from './containers/AllRecipesPage/AllRecipesPage'
import FavouriteRecipesPage from './containers/FavouriteRecipesPage/FavouriteRecipesPage'
import HomePage from './containers/HomePage/HomePage'
import LoginPage from './containers/LoginPage/LoginPage'
import NewRecipesPage from './containers/NewRecipesPage/NewRecipesPage'
import ProfilePage from './containers/ProfilePage/ProfilePage'

import { RoutePaths } from './routes/routePaths'

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
        <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
        <Route path={RoutePaths.FAVOURITE_RECIPES} element={<FavouriteRecipesPage />} />
        <Route path={RoutePaths.ALL_RECIPES} element={<AllRecipesPage />} />
        <Route path={RoutePaths.NEW_RECIPE} element={<NewRecipesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
