import React from 'react';
import { connect } from 'react-redux';

import 'PokemonList.scss';

function PokemonList({ pokemonList, dispatch }) {
  return <p>List works...</p>;
}

function mapStateToProps({ pokeReducer }) {
  return {
    pokemonList: pokeReducer.pokemonList,
  };
}

export default connect(mapStateToProps)(PokemonList);
