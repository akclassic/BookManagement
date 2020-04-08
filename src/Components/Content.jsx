import React from 'react'
import { Switch, Route } from 'react-router-dom';

import './css/Content.css';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import SearchBook from '../Pages/SearchBook';
import Error from '../Pages/Error';
import BooksByPublisher from '../Pages/BooksByPublisher';
import BooksByAuthor from '../Pages/BooksByAuthor';

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
                <Route path="/SearchBook">
                    <SearchBook />
                </Route>
                <Route path="/booksbypublisher" exact>
                    <BooksByPublisher />
                </Route>
                <Route path="/booksbypublisher/:publisherid/:authorid" exact component={BooksByAuthor} />
                    <BooksByAuthor />
                {/* </Route> */}
                <Route path="*">
                    <Error />
                </Route>
            </Switch>
        </div>
    )
}
