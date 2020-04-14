import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { fakeAuth } from '../../router';

export default () => {
  let history = useHistory();
  let localtion = useLocation();

  let { from }: any = localtion.state || { from: { pathname: '/' } };

  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      demo page
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};
