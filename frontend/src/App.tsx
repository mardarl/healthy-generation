import React, { FunctionComponent, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import { withRecipes } from './components/RecipesHOC'

import { RoutePaths } from './routes/routePaths'

const RecipesPage = lazy(() => import('./containers/RecipesPage'))
const HomePage = lazy(() => import('./containers/HomePage'))
const LoginPage = lazy(() => import('./containers/LoginPage'))
const NewRecipesPage = lazy(() => import('./containers/NewRecipesPage'))
const ProfilePage = lazy(() => import('./containers/ProfilePage'))
const RecipePage = lazy(() => import('./containers/RecipePage'))

const AllRecipesList = withRecipes(RecipesPage, false)
const FavouriteRecipesList = withRecipes(RecipesPage, true)

const App: FunctionComponent = () => {
  return (
    <div className='App'>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
          <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
          <Route path={RoutePaths.FAVOURITE_RECIPES} element={<FavouriteRecipesList />} />
          <Route path={RoutePaths.ALL_RECIPES} element={<AllRecipesList />} />
          <Route path={RoutePaths.NEW_RECIPE} element={<NewRecipesPage />} />
          <Route path={RoutePaths.RECIPE} element={<RecipePage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
