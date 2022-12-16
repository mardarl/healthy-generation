import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router';

import { RoutePaths } from '../../routes/routePaths';

import Button from '../../ui-components/Button/Button';

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate()

  return (
    <div className="LoginPage">
      <p>
        login page
      </p>
      <Button 
        onClick={() => navigate(RoutePaths.HOME)}
      >
          log in
      </Button>
    </div>
  );
}

export default LoginPage;
