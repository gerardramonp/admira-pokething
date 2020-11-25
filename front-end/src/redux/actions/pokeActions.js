import axios from 'axios';
import actionTypes from './actionTypes';

function setLoading() {
  return {
    type: actionTypes.SET_LOADING,
  };
}

function loadPokemonsSuccess(pokemonList) {
  return {
    type: actionTypes.LOAD_POKEMONS,
    pokemonList,
  };
}

function loadPokemonsError(error) {
  return {
    type: actionTypes.LOAD_POKEMONS_ERROR,
    error,
  };
}

function loadPokemonDetailsSuccess(pokemon) {
  return {
    type: actionTypes.LOAD_POKEMON_DETAIL,
    pokemon,
  };
}

export function requestPokemons() {
  return async (dispatch) => {
    dispatch(setLoading());
    const backEndpoint = '/api/pokemons';
    try {
      const pokemonList = await axios.get(backEndpoint);
      dispatch(loadPokemonsSuccess(pokemonList.data));
    } catch (listError) {
      dispatch(loadPokemonsError(listError));
    }
  };
}

export function loadPokemonById(pokemonId) {
  return async (dispatch) => {
    dispatch(setLoading());
    const backEndpoint = `/api/pokemons/details/${pokemonId}`;
    try {
      const pokemon = await axios.get(backEndpoint);
      dispatch(loadPokemonDetailsSuccess(pokemon.data));
    } catch (detailError) {
      dispatch(loadPokemonsError(detailError));
    }
  };
}
