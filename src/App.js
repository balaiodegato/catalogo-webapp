import React from 'react';
import logo from './logo.svg';
import './App.css';
import Details from './DetailsPage/Details.js';
import AnimalList from './AnimalList/AnimalList';

function App() {
  return (
    <div className="App">
      <Details/>
      <AnimalList />
    </div>
  )
}

export default App;
