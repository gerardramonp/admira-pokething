import React from 'react';
import { connect } from 'react-redux';

function PokemonDetail() {
  return (<div>Detail works</div>);
}

function mapStateToProps({ pokeReducer }) {
  return {
    pokeData: pokeReducer.pokeData,
  };
}

export default connect(mapStateToProps)(PokemonDetail);
