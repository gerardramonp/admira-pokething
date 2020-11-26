/* eslint-disable no-case-declarations */
import actionTypes from '../actions/actionTypes';

export default function pokeReducer(state = {}, action) {
  let newState = null;
  switch (action.type) {
    case actionTypes.SET_LOADING:
      newState = { ...state, loading: true };
      break;

    case actionTypes.SET_LOADING_MOVES:
      newState = { ...state, loadingMoves: true };
      break;

    case actionTypes.LOAD_POKEMONS:
      newState = {
        ...state,
        loading: false,
        pokemonList: action.pokemonList,
        displayPokemonList: action.pokemonList,
      };
      break;

    case actionTypes.LOAD_POKEMONS_ERROR:
      newState = { ...state, loading: false, error: action.error };
      break;

    case actionTypes.FILTER_POKEMON_LIST:
      const filteredPokemonList = state.pokemonList.filter((pokemon) => (
        pokemon.name.includes(action.pokemonName)
      ));
      newState = { ...state, displayPokemonList: filteredPokemonList };
      break;

    case actionTypes.FILL_POKEMON_DISPLAY_LIST:
      newState = { ...state, displayPokemonList: state.pokemonList };
      break;

    case actionTypes.LOAD_POKEMON_DETAIL:
      newState = { ...state, loading: false, pokemonDetail: action.pokemon };
      break;

    case actionTypes.LOAD_MOVE_TYPES:
      newState = { ...state, loadingMoves: false, movesWithType: action.movesWithType };
      break;

    case actionTypes.CLEAR_POKEMON_DETAIL:
      newState = {
        ...state, loading: false, pokemonDetail: {}, loadingMoves: false, movesWithType: [],
      };
      break;

    default:
      newState = state;
      break;
  }
  return newState;
}
