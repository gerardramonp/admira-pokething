import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requestPokemons from '../../redux/actions/pokeActions';
import PokemonCard from './PokemonCardComponent/PokemonCard';

import './PokemonList.css';

function PokemonList({ pokemonList, dispatch }) {
  useEffect(() => {
    if (!pokemonList?.length) {
      dispatch(requestPokemons());
    }
  });

  const loadingRender = (
    <div className="loading-container">
      <img
        className="loading__img"
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDI5YjhiZDktY2I1YS00MWU0LTljN2UtZWU1MTZmYWNlOWJiXC9kYXlvM293LTdhYzg2YzMxLThiMmItNDgxMC04OWYyLWU2MTM0Y2FmMWYyZC5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.LJBxDkRocQStjZpmj9Injfv73mG2SQZ8X6HNdlP5WHw"
        alt="loading"
      />
      <p className="loading__text">Loading pokemon list...</p>
    </div>
  );

  const pokemonListRender = (
    <div className="pokemon-list">
      {pokemonList?.length
        && pokemonList.map((currentPokemon) => {
          const {
            name, id, types, species, sprites,
          } = currentPokemon;
          const pokemonData = {
            name, id, types, species, sprites,
          };
          return (
            <Link to={`/detail/${pokemonData.id}`}>
              <PokemonCard
                key={name}
                pokemonData={pokemonData}
              />
            </Link>
          );
        })}

    </div>
  );

  return (
    <>
      <h1>Admira Pokedex</h1>
      <section className="pokemon-list-container">
        {pokemonList?.length ? pokemonListRender : loadingRender}
      </section>
    </>
  );
}

function mapStateToProps({ pokeReducer }) {
  return {
    pokemonList: pokeReducer.pokemonList,
  };
}

export default connect(mapStateToProps)(PokemonList);
