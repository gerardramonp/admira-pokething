import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PokemonList from './components/pokemonListComponent/PokemonList';
import Header from './components/HeaderComponent/Header';

function App() {
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Header />
      <Switch>
        <Route path="/" component={PokemonList} />
      </Switch>
    </>
  );
}

export default App;
