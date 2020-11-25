import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadPokemonById } from '../../redux/actions/pokeActions';

function PokemonDetail({ pokemonDetail, dispatch }) {
  const { pokemonId } = useParams();
  useEffect(() => {
    if (!pokemonDetail?.name) {
      dispatch(loadPokemonById(pokemonId));
    }
  }, [pokemonDetail?.name]);

  return (
    <>
      { pokemonDetail && (
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
      )}
    </>

  );
}

function mapStateToProps({ pokeReducer }) {
  return {
    pokemonDetail: pokeReducer.pokemonDetail,
  };
}

export default connect(mapStateToProps)(PokemonDetail);
