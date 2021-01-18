import React from 'react';
import { Route, Redirect } from "react-router-dom";

type GuardedRouteProps = {
    component: any;
    path: string
}

const GuardedRoute: React.FC<GuardedRouteProps> = ({ component, path }) => {
    const isAuthotized = localStorage.getItem('token');

    return (
        isAuthotized ? (<Route path={path} component={component} />) : <Redirect to='/login' />
    )
}

export default GuardedRoute;