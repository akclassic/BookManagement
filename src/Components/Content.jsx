import React from 'react'
import { Switch, Route } from 'react-router-dom';

import './css/Content.css';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Error from '../Pages/Error';

export default function Content() {
    return (
        <div className="App-Content">
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="*">
                    <Error />
                </Route>
            </Switch>
        </div>
    )
}
