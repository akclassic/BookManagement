import React from 'react'
import { Switch, Route } from 'react-router-dom';

import './css/Content.css';
import Login from '../Pages/Login';

export default function Content() {
    return (
        <div className="App-Content">
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>
                <Route path="/dashboard">
                    
                </Route>
                <Route path="*">
                    
                </Route>
            </Switch>
        </div>
    )
}
