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

  test('Should set loadingMoves to true when action.type is SET_LOADING_MOVES', () => {
    const initialState = {
      pokemonList: [],
      loading: false,
      loadingMoves: false,
    };

    const { loadingMoves } = pokeReducer(initialState,
      { type: actionTypes.SET_LOADING_MOVES });

    expect(loadingMoves).toBe(true);
  });

  test('Should reset pokemon details when type is CLEAR_POKEMON_DETAIL', () => {
    const initialState = {
      loading: false, pokemonDetail: {}, loadingMoves: false, movesWithType: [], pokemonList: [{ name: 'charmander' }],
    };

    const newState = pokeReducer(initialState, { type: actionTypes.CLEAR_POKEMON_DETAIL });

    expect(newState).toEqual(initialState);
  });

  test('Should save pokemon details when type is LOAD_POKEMON_DETAIL', () => {
    const initialState = {
      loading: false, pokemonDetail: {}, loadingMoves: false, movesWithType: [], pokemonList: [{ name: 'charmander' }],
    };

    const pokemon = { name: 'Pikachu' };
    const { pokemonDetail } = pokeReducer(initialState,
      { type: actionTypes.LOAD_POKEMON_DETAIL, pokemon });

    expect(pokemonDetail).toEqual(pokemon);
  });

  test('Should save moves with type when type is LOAD_MOVE_TYPES', () => {
    const initialState = {
      loading: false, pokemonDetail: {}, loadingMoves: false, movesWithType: [], pokemonList: [{ name: 'charmander' }],
    };

    const movesWithTypeMock = [{ move: 'Grow' }];
    const { movesWithType } = pokeReducer(initialState,
      { type: actionTypes.LOAD_MOVE_TYPES, movesWithType: movesWithTypeMock });

    expect(movesWithType).toEqual(movesWithTypeMock);
  });

  test('Should fill pokemonDisplay with pokemonList when type is FILL_POKEMON_DISPLAY_LIST', () => {
    const initialState = {
      loading: false, pokemonDetail: {}, loadingMoves: false, movesWithType: [], pokemonList: [{ name: 'charmander' }],
    };

    const { displayPokemonList } = pokeReducer(initialState,
      { type: actionTypes.FILL_POKEMON_DISPLAY_LIST });

    expect(displayPokemonList).toEqual(initialState.pokemonList);
  });

  test('Should filter pokemons when type is FILTER_POKEMON_LIST', () => {
    const initialState = {
      pokemonList: [{ name: 'charmander' }, { name: 'charmander' }, { name: 'pikachu' }],
    };
  });
});
