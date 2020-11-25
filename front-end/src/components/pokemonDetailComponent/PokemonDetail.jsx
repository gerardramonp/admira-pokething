import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { loadPokemonById } from '../../redux/actions/pokeActions';

import './PokemonDetail.css';

function PokemonDetail({ pokemonDetail, loading, dispatch }) {
  const { pokemonId } = useParams();
  useEffect(() => {
    if (!pokemonDetail?.name) {
      dispatch(loadPokemonById(pokemonId));
    }
  }, [pokemonDetail?.name]);

  return (
    <>
      {loading && <p>Loading...</p>}
      { pokemonDetail && pokemonDetail?.id && (
        <div className={`pokemon-detail bg-${pokemonDetail.types[0].type.name}`}>
          <div className="pokemon-detail__container">

            {console.log(pokemonDetail)}
            <div className="pokemon-detail__title">
              <Link to="/">
                <img src="https://trello-attachments.s3.amazonaws.com/5f7f173f3f927d440950a925/5fbe91ca731763484cbf700b/42db221f6e67c04903a423a3e6e41975/back-button.png" alt="back-to-list" className="back" />
              </Link>

              <h1 className="title__text title__text--main">
                {' '}
                {pokemonDetail.name}
              </h1>
              <h1 className="title__text">
                #
                {' '}
                {pokemonDetail.id}
              </h1>
            </div>
            <div className="poke-line" />
            <main className="pokemon-detail__main">
              <section className="detail-main__info">
                <div className="detail-info__types">
                  {pokemonDetail.types.map(({ type }) => <span key={type.name} className={`types__type ${type.name}`}>{type.name}</span>)}
                </div>
                <div className="detail-info__sprites">
                  <img src={pokemonDetail.sprites.front_default} alt="front-sprite" className="sprites__item" />
                  <img src={pokemonDetail.sprites.back_default} alt="back-sprite" className="sprites__item" />
                </div>
              </section>
              <section className="main__stats">
                <h3 className="pokemon-detail__subtitle">Base Stats:</h3>
                <div className="stats__bars">
                  {/* Aqui fer un map per cada stat posar la seva barra */}
                  {
                  pokemonDetail.stats.map((stat) => (
                    <div className="bars__item">
                      <div className="stats-left">
                        <span className="stat-label">
                          <b>{stat.stat.name}</b>
                          :
                          {' '}
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="stats-right">
                        <progress value={stat.base_stat} max="250" className="progressbar">stat.base_stat</progress>
                      </div>
                    </div>
                  ))
                }
                </div>
              </section>
            </main>
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
