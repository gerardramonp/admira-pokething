import {Switch, Link} from 'react-router-dom'
import PokemonList from './components/pokemonListComponent/PokemonList'



function App() {
  return (
      <Switch>
        <Link path="/" component={PokemonList}>
      </Switch>
  );
}

export default App;
