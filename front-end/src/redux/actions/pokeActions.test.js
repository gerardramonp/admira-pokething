import axios from 'axios';
import {
  requestPokemons, loadPokemonById, loadMoveTypes, clearPokemonDetails,
  filterPokemonByName, fillDisplayPokemonList,
} from './pokeActions';
import actionTypes from './actionTypes';

jest.mock('axios');

describe('pokeActions test', () => {
  let dispatch = null;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    dispatch.mockClear();
    axios.get.mockClear();
    axios.post.mockClear();
  });

  describe('requestPokemons action-creator tests', () => {
    test('Should call dispatch with setLoading', () => {
      requestPokemons()(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });

    test('Should dispatch loadPokemonsError when axios throws an error', async () => {
      axios.get.mockReturnValueOnce(Promise.reject(new Error('ErrorMsg')));

      await requestPokemons()(dispatch);

      expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.LOAD_POKEMONS_ERROR);
    });

    test('Should dispatch requestPokemonsSuccess when axios returns a pokemon list', async () => {
      axios.get.mockReturnValueOnce(Promise.resolve('pokemonResults'));

      await requestPokemons()(dispatch);

      const expectedCall = { pokemonList: undefined, type: 'LOAD_POKEMONS' };

      expect(dispatch.mock.calls[1][0]).toEqual(expectedCall);
    });
  });

  describe('loadPokemonById action-creator tests', () => {
    test('Should dispatch setLoading', () => {
      loadPokemonById(4)(dispatch);

      expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SET_LOADING' });
    });

    test('Should dispatch loadPokemonsError when axios throws an error', async () => {
      axios.get.mockReturnValueOnce(Promise.reject(new Error('ErrorMsg')));

      await loadPokemonById(4)(dispatch);

      expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.LOAD_POKEMONS_ERROR);
    });

    test('Should dispatch loadPokemonDetailsSuccess when axios returns a pokemon', async () => {
      axios.get.mockReturnValueOnce(Promise.resolve('pokemonResults'));

      await loadPokemonById(4)(dispatch);

      const expectedCall = { pokemonList: undefined, type: 'LOAD_POKEMON_DETAIL' };

      expect(dispatch.mock.calls[1][0]).toEqual(expectedCall);
    });
  });

  describe('loadMoveTypes tests', () => {
    const mockMoves = [{ name: 'surf', type: 'water' }, { name: 'blaze', type: 'fire' }];

    it('Should dispatch setLoadingMoves', () => {
      loadMoveTypes(mockMoves)(dispatch);

      expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SET_LOADING_MOVES' });
    });

    test('Should dispatch loadPokemonsError when axios throws an error', async () => {
      axios.post.mockReturnValueOnce(Promise.reject(new Error('ErrorMsg')));

      await loadMoveTypes(mockMoves)(dispatch);

      expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.LOAD_POKEMONS_ERROR);
    });

    test('Should dispatch loadPokemonDetailsSuccess when axios returns a pokemon', async () => {
      axios.post.mockReturnValue(Promise.resolve({ data: ['moves'] }));

      await loadMoveTypes(mockMoves)(dispatch);

      const expectedCall = { movesWithType: ['moves'], type: 'LOAD_MOVE_TYPES' };

      expect(dispatch.mock.calls[1][0]).toEqual(expectedCall);
    });
  });

  describe('Sync action-creators tests', () => {
    test('clearPokemonDetails should return action of type: CLEAR_POKEMON_DETAIL', () => {
      const result = clearPokemonDetails();
      expect(result).toEqual({ type: 'CLEAR_POKEMON_DETAIL' });
    });

    test('filterPokemonByName should return action of type: FILTER_POKEMON_LIST and the pokemon name', () => {
      const result = filterPokemonByName('Pikachu');
      expect(result).toEqual({ type: 'FILTER_POKEMON_LIST', pokemonName: 'Pikachu' });
    });

    test('fillDisplayPokemonList should return action of type: FILL_POKEMON_DISPLAY_LIST', () => {
      const result = fillDisplayPokemonList();
      expect(result).toEqual({ type: 'FILL_POKEMON_DISPLAY_LIST' });
    });
  });
});
