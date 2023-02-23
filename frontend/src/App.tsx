import React, { FunctionComponent, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'

import { RoutePaths } from './routes/routePaths'

const AllRecipesPage = lazy(() => import('./containers/AllRecipesPage'))
const FavouriteRecipesPage = lazy(() => import('./containers/FavouriteRecipesPage'))
const HomePage = lazy(() => import('./containers/HomePage'))
const LoginPage = lazy(() => import('./containers/LoginPage'))
const NewRecipesPage = lazy(() => import('./containers/NewRecipesPage'))
const ProfilePage = lazy(() => import('./containers/ProfilePage'))

const App: FunctionComponent = () => {
  return (
    <div className='App'>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
          <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
          <Route path={RoutePaths.FAVOURITE_RECIPES} element={<FavouriteRecipesPage />} />
          <Route path={RoutePaths.ALL_RECIPES} element={<AllRecipesPage />} />
          <Route path={RoutePaths.NEW_RECIPE} element={<NewRecipesPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
