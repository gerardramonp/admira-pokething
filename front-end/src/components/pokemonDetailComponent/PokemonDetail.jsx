import React from 'react';
import { connect } from 'react-redux';

function PokemonDetail({ pokemonDetail }) {
  return (
    <>
      <div className="pokemon-detail">
        <h1>
          #
          {' '}
          {pokemonDetail.id}
          {' '}
          -
          {pokemonDetail.name}
        </h1>
      </div>
    </>

  );
}

function mapStateToProps({ pokeReducer }) {
  return {
    pokemonDetail: pokeReducer.pokemonDetail,
  };
}

export default connect(mapStateToProps)(PokemonDetail);
