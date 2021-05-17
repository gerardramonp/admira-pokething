import axios from 'axios';
import actionTypes from './actionTypes';

function setLoading() {
  return {
    type: actionTypes.SET_LOADING,
  };
}

function setLoadingMoves() {
  return {
    type: actionTypes.SET_LOADING_MOVES,
  };
}

function loadPokemonsSuccess(pokemonList) {
  return {
    type: actionTypes.LOAD_POKEMONS,
    pokemonList,
  };
}

function loadPokemonsSuccess(pokemonList) {
  return {
    type: 'LOAD_POKEMONS_SUCCESS',
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

export function clearPokemonDetails() {
  return {
    type: actionTypes.CLEAR_POKEMON_DETAIL,
  };
}

export function filterPokemonByName(pokemonName) {
  return {
    type: actionTypes.FILTER_POKEMON_LIST,
    pokemonName,
  };
}

export function fillDisplayPokemonList() {
  return {
    type: actionTypes.FILL_POKEMON_DISPLAY_LIST,
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

function moveTypesSuccess(movesWithType) {
  return {
    type: actionTypes.LOAD_MOVE_TYPES,
    movesWithType,
  };
}

export function loadMoveTypes(moves) {
  return async (dispatch) => {
    dispatch(setLoadingMoves());
    const backEndpoint = '/api/pokemons/moves';
    try {
      const movesWithType = await axios.post(backEndpoint, { moves });
      dispatch(moveTypesSuccess(movesWithType.data));
    } catch (movesError) {
      dispatch(loadPokemonsError(movesError));
    }
  };
}
