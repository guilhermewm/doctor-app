import React, { lazy, Suspense } from 'react';
import './App.scss';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Home = lazy(() => import('./pages/Home/Index'));
const Login = lazy(() => import('./pages/Login/Index'));
const NotFound = lazy(() => import('./navigation/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }>
				<Switch>  
					<Route exact path="/login" component={Login}/>
					<Route exact path="/" component={Home}/>
					<Route component={NotFound} />
				</Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
