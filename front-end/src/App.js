import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/HeaderComponent/Header';
import PokemonList from './components/pokemonListComponent/PokemonList';
import PokemonDetail from './components/pokemonDetailComponent/PokemonDetail';

function App() {
  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Header />
      <Switch>
        <Route path="/detail/:pokemonId" component={PokemonDetail} />
        <Route path="/" component={PokemonList} />
      </Switch>
    </>
  );
}

export default App;
