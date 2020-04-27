import React, { useState } from 'react';
import Details from './app/components/DetailsPage/Details.js';
import PetList from './app/components/PetList/PetList';
import Header from './app/components/Header/Header'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { useParams } from 'react-router-dom';

const history = createBrowserHistory();

function ParamDetails() {
  const params = useParams()
  return <Details petId={params.id}/>
}

function App() {
  const [filter, setFilter] = useState('')

  return (
    <Router history={history}>
      <Header filter={filter} setFilter={setFilter} />

      <Switch>
        <Route exact path="/">
          <PetList filter={filter} />
        </Route>
        <Route exact path="/details/:id">
          <ParamDetails/>
        </Route>
      </Switch>

    </Router>
  )
}

export default App;
