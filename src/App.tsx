import React, { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutePaths } from './routes/routePaths';

const HomePage = React.lazy(() => import('./containers/HomePage/HomePage'));
const ProfilePage = React.lazy(() => import('./containers/ProfilePage/ProfilePage'));
const AllRecipesPage = React.lazy(() => import('./containers/AllRecipesPage/AllRecipesPage'));
const FavouriteRecipesPage = React.lazy(() => import('./containers/FavouriteRecipesPage/FavouriteRecipesPage'));

const App: FunctionComponent = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
          <Route path={RoutePaths.FAVOURITE_RECIPES} element={<FavouriteRecipesPage />} />
          <Route path={RoutePaths.ALL_RECIPES} element={<AllRecipesPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
    </div>
  );
}

export default App;
