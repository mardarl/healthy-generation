import React, { FunctionComponent, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Header from './components/Header'
import { withRecipes } from './components/RecipesHOC'
import { PrivateRoute } from './routes/PrivateRoute'

import { RoutePaths } from './routes/routePaths'
import GlobalStyles from './styles/Global'
import { theme } from './styles/theme'
import LoadingScreen from './components/LoadingScreen'
import Footer from './components/Footer'

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
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Suspense fallback={<LoadingScreen />}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
          <Route
            path={RoutePaths.PROFILE}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutePaths.FAVOURITE_RECIPES}
            element={
              <PrivateRoute>
                <FavouriteRecipesList />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutePaths.ALL_RECIPES}
            element={
              <PrivateRoute>
                <AllRecipesList />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutePaths.NEW_RECIPE}
            element={
              <PrivateRoute>
                <NewRecipesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutePaths.RECIPE}
            element={
              <PrivateRoute>
                <RecipePage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<HomePage />} />
        </Routes>
        <Footer />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
