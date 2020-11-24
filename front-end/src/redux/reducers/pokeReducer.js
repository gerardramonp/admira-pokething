import actionTypes from '../actions/actionTypes';

export default function pokeReducer(state = {}, action) {
  let newState = null;
  switch (action.type) {
    case actionTypes.SET_LOADING:
      newState = { ...state, loading: true };
      break;
    case actionTypes.LOAD_POKEMONS:
      newState = {
        ...state,
        loading: false,
        pokemonList: action.pokemonList,
      };
      break;
    case actionTypes.LOAD_POKEMONS_ERROR:
      newState = { ...state, loading: false, error: action.error };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}
