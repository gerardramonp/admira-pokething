import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadPokemonById } from '../../redux/actions/pokeActions';

import './PokemonDetail.css';

function PokemonDetail({ pokemonDetail, dispatch }) {
  const { pokemonId } = useParams();
  useEffect(() => {
    if (!pokemonDetail?.name) {
      dispatch(loadPokemonById(pokemonId));
    }
  }, [pokemonDetail?.name]);

  return (
    <>
      { pokemonDetail && pokemonDetail?.name && (
        <div className={`pokemon-detail bg-${pokemonDetail.types[0].type.name}`}>
          {console.log(pokemonDetail)}
          <h1 className="pokemon-detail__title">
            #
            {' '}
            {pokemonDetail.id}
            {' '}
            -
            {' '}
            {pokemonDetail.name}
          </h1>
          <div className="pokemon-detail__main">
            <div className="detail-main__info">
              <div className="detail-info__types">
                {pokemonDetail.types.map(({ type }) => <span key={type.name} className={`types__type ${type.name}`}>{type.name}</span>)}
              </div>
            </div>
            <div className="main__stats" />
          </div>
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
