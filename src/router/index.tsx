import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { asyncComponent } from '@/router/AsyncComponent';

const routes: Array<Object> = [
    {
        path: '/',
        component: asyncComponent(() => import("@/container/IndexPage")),
        exact: false
    }
];



const RouteConfig: Function = () => {
    return (
        // <IndexPage />
        <Router>
            {
                routes.map((v: Object, i: Number) => {
                    return <Route {...v} key={i} />
                })
            }
        </Router>
    );
}


export default RouteConfig;