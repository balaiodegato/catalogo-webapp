import React, { useEffect, useContext } from 'react';
import { Router, Route, Switch, useParams } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Details from './app/components/DetailsPage/Details.js';
import PetList from './app/components/PetList/PetList';
import Header from './app/components/Header/Header'

import { AppContext, ACTIONS } from './AppContext';
import { petsMock, allPetsMock } from './Pets.mock'
import Api from './api';

const history = createBrowserHistory();

function ParamDetails() {
    const params = useParams()
    return <Details petId={params.id} />
}

function App() {
    const { dispatch } = useContext(AppContext)

    useEffect(() => {
        const fetchData = async () => {
            const response = await Api.getAllPets()
            // const response = { data: allPetsMock }
            
            dispatch({
                type: ACTIONS.SET_PETS,
                payload: response.data
            })
        }
        fetchData()
    }, [])

    return (
        <Router history={history}>
            <Header />

            <Switch>
                <Route exact path="/">
                    <PetList />
                </Route>
                <Route exact path="/newpet/dog">
                    <Details petId={null} kind='dog' />
                </Route>
                <Route exact path="/newpet/cat">
                    <Details petId={null} kind='cat' />
                </Route>
                <Route exact path="/details/:id">
                    <ParamDetails />
                </Route>
            </Switch>

        </Router>
    )
}

export default App;
