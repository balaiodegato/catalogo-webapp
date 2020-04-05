import React from 'react';
import Details from './app/components/DetailsPage/Details.js';
import PetList from './app/components/PetList/PetList';
import Header from './app/components/Header'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Header />

      <Switch>
        <Route exact path="/">
          <PetList />
        </Route>
        <Route exact path="/details/:id">
          <Details />
        </Route>
      </Switch>

    </Router>
  )
}

export default App;
