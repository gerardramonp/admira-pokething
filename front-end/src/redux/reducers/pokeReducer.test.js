import pokeReducer from './pokeReducer';
import actionTypes from '../actions/actionTypes';

describe('pokeReducer tests', () => {
  test('Should return empty object initial state is undefined', () => {
    const newState = pokeReducer(undefined, {});

    expect(newState).toEqual({});
  });

  test('Should return empty object no initial state or action are recieved', () => {
    const newState = pokeReducer({}, {});

    expect(newState).toEqual({});
  });

  test('Should return initial state when no action is passed', () => {
    const initialState = {
      pokeReducer: {
        pokemonList: [],
        loading: false,
      },
    };

    const newState = pokeReducer(initialState, {});

    expect(newState).toEqual(initialState);
  });

  test('Should return initial state when action.type is not in the cases of the reducer', () => {
    const initialState = {
      pokemonList: [],
      loading: false,
    };

    const newState = pokeReducer(initialState, { type: 'randomAction' });

    expect(newState).toEqual(initialState);
  });

  test('Should set loading to true when recieving action.type SET_LOADING', () => {
    const initialState = {
      pokemonList: [],
      loading: false,
    };

    const { loading } = pokeReducer(initialState, { type: actionTypes.SET_LOADING });

    expect(loading).toBe(true);
  });

  test('Should set loading to false when recieving action.type LOAD_POKEMONS', () => {
    const initialState = {
      pokemonList: [],
      loading: false,
    };

    const { loading } = pokeReducer(initialState, { type: actionTypes.LOAD_POKEMONS });

    expect(loading).toBe(false);
  });

  test('Should load pokemons when action.type is LOAD_POKEMONS', () => {
    const initialState = {
      pokemonList: [],
      loading: false,
    };
    const samplePokemonList = [{ name: 'pikachu', id: 10 }, { name: 'charmander', id: '4' }];
    const { pokemonList } = pokeReducer(initialState,
      { type: actionTypes.LOAD_POKEMONS, pokemonList: samplePokemonList });

    expect(pokemonList).toEqual(samplePokemonList);
  });

  test('Should save the error when action.type is LOAD_POKEMONS_ERROR', () => {
    const initialState = {
      pokemonList: [],
      loading: false,
    };

    const errorMessage = 'Some Error Message';
    const { error } = pokeReducer(initialState,
      { type: actionTypes.LOAD_POKEMONS_ERROR, error: errorMessage });

    expect(error).toEqual(errorMessage);
  });
});
