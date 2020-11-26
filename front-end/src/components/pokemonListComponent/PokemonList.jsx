import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestPokemons, clearPokemonDetails } from '../../redux/actions/pokeActions';
import PokemonCard from './PokemonCardComponent/PokemonCard';
import Loading from '../LoadingComponent/Loading';

import './PokemonList.css';

function PokemonList({ pokemonList, loading, dispatch }) {
  useEffect(() => {
    if (!pokemonList?.length) {
      dispatch(requestPokemons());
    }
  });

  function handleClick() {
    dispatch(clearPokemonDetails());
  }

  function handleChange({ target }) {
    const { value } = target;
  }

  const pokemonListRender = (
    <div className="pokemon-list">
      {pokemonList?.length
        && pokemonList.map((currentPokemon) => (
          <Link to={`/detail/${currentPokemon.id}`} key={currentPokemon.name} className="link" onClick={handleClick}>
            <PokemonCard
              pokemonData={currentPokemon}
            />
          </Link>
        ))}
    </div>
  );

  return (
    <>
      <div className="title__container">
        <div className="title__upper">
          <div className="title__button" />
          <div className="title__button" />
        </div>
        <div className="title__screen">
          {loading
            ? (
              <p className="screen__text">
                <Loading />
              </p>
            )
            : (
              <input
                type="text"
                placeholder="Search pokemon..."
                className="screen__input"
                onChange={(event) => { handleChange(event); }}
              />
            ) }

        </div>
        <div className="title__bottom">
          <div className="title__button title__button--big" />
          <div className="bottom__lines">
            <div className="lines__item" />
            <div className="lines__item" />
            <div className="lines__item" />
          </div>
        </div>
      </div>
      <section className="pokemon-list-container">
        {pokemonList?.length && pokemonListRender }
      </section>
    </>
  );
}

function mapStateToProps({ pokeReducer }) {
  return {
    pokemonList: pokeReducer.pokemonList,
    loading: pokeReducer.loading,
  };
}

export default connect(mapStateToProps)(PokemonList);
