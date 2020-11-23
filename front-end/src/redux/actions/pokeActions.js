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

export default function loadPokemons() {
  return async (dispatch) => {
    dispatch(setLoading());
    const backEndpoint = '/api/pokemons';
    try {
      const pokemonList = await axios(backEndpoint);
      dispatch(loadPokemonsSuccess(pokemonList.data));
    } catch (error) {
      dispatch(loadPokemonsError(error));
    }
  };
}
