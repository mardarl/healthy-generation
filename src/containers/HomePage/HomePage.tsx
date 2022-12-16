import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router';

import { RoutePaths } from '../../routes/routePaths';

import Button from '../../ui-components/Button/Button';

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate()

  return (
    <div className="HomePage">
      <p>
        home page
      </p>
      <Button 
        onClick={() => navigate(RoutePaths.LOGIN)}
      >
        login
      </Button>
    </div>
  );
}

export default HomePage;
