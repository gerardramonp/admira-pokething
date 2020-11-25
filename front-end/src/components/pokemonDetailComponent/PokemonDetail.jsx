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
      { pokemonDetail && pokemonDetail?.id && (
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
          <main className="pokemon-detail__main">
            <section className="detail-main__info">
              <div className="detail-info__types">
                {pokemonDetail.types.map(({ type }) => <span key={type.name} className={`types__type ${type.name}`}>{type.name}</span>)}
              </div>
              <div className="detail-info__sprites">
                <img src={pokemonDetail.sprites.default__front} alt="front-sprite" className="sprites__item" />
                <img src={pokemonDetail.sprites.default__back} alt="back-sprite" className="sprites__item" />
              </div>
              <h4>Other info:</h4>
              <div className="detail-info__other">
                <p>
                  Height:
                  {' '}
                  {pokemonDetail.height}
                </p>
                <p className="other__item">
                  Weight:
                  {' '}
                  {pokemonDetail.weight}
                </p>
              </div>
            </section>
            <section className="main__stats">
              <h3>Base Stats:</h3>
              <div className="stats__bars">
                {/* Aqui fer un map per cada stat posar la seva barra */}
                {
                  pokemonDetail.stats.map((stat) => (
                    <div className="bars__item">
                      <span>Stat:</span>
                      <progress max="100" value={pokemonDetail.stats.coso} />
                    </div>
                  ))
                }

              </div>
            </section>
          </main>
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
