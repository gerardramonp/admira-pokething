import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { loadPokemonById } from '../../redux/actions/pokeActions';
import Loading from '../LoadingComponent/Loading';
import MoveList from './MoveListComponent/MoveList';

import './PokemonDetail.css';

function PokemonDetail({
  pokemonDetail, loading, error, dispatch,
}) {
  const { pokemonId } = useParams();

  // Fent servir useSelector i useDispatch NO PASEM RES PER PROPS NI FEM SERVIR MAPSTATETOPROPS NI CONNECT
  // const dispatch = useDispatch();
  // const {pokemonDetail, loading, error} = useSelector(({pokeReducer})=> pokeReducer);

  useEffect(() => {
    if (!pokemonDetail?.name) {
      dispatch(loadPokemonById(pokemonId));
    }
  }, [pokemonDetail?.name]);

  return (
    <>
      {loading
      && (
      <div className="detail__loading">
        <Loading />
      </div>
      )}
      {error && <h3 className="error__msg">There has been an error loading the pokemon</h3>}
      { pokemonDetail && pokemonDetail?.id && (
        <div className={`pokemon-detail bg-${pokemonDetail.types[0].type.name}`}>
          <section className="pokemon-detail__container">
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
                  {
                  pokemonDetail.stats.map((stat) => (
                    <div className="bars__item" key={stat.stat.name}>
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
          </section>
          <section className="details__moves">
            <div className="moves__container">
              <h2>
                {pokemonDetail.name}
                {' '}
                {' '}
                move list
              </h2>
              <div className="poke-line" />
              <MoveList rawMoves={pokemonDetail.moves} />
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function mapStateToProps({ pokeReducer }) {
  return {
    pokemonDetail: pokeReducer.pokemonDetail,
    loading: pokeReducer.loading,
    error: pokeReducer.error,
  };
}

export default connect(mapStateToProps)(PokemonDetail);
