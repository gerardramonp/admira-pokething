import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PokemonList from './components/pokemonListComponent/PokemonList';

function App() {
  return (
    <Switch>
      <Route path="/" component={PokemonList} />
    </Switch>
  );
}

export default App;
