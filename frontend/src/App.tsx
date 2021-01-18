import React, { lazy, Suspense } from 'react';
import './App.scss';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import GuardedRoute from './Components/GuardRoute/GuardRoute';
import SpinnerWrapper from './Components/SpinnerWrapper/SpinnerWrapper';

const Home = lazy(() => import('./pages/Case/Index'));
const Login = lazy(() => import('./pages/Login/Index'));
const NotFound = lazy(() => import('./navigation/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <SpinnerWrapper />
      }>
				<Switch>  
					<Route exact path="/login" component={Login}/>
					<GuardedRoute path='/' component={Home} />
					<Route component={NotFound} />
				</Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
