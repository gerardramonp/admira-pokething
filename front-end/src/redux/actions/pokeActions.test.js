import axios from 'axios';
import loadPokemons from './pokeActions';
import actionTypes from './actionTypes';

jest.mock('axios');

describe('pokeActions test', () => {
  describe('loadPokemons action-creator tests', () => {
    let dispatch = null;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    afterEach(() => {
      axios.get.mockClear();
    });

    test('Should call dispatch with setLoading', () => {
      loadPokemons()(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });

    test('Should dispatch loadPokemonsError when axios throws an error', async () => {
      axios.get.mockReturnValueOnce(Promise.reject(new Error('ErrorMsg')));

      await loadPokemons()(dispatch);

      expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.LOAD_POKEMONS_ERROR);
    });

    test('Should dispatch loadPokemonsSuccess when axios returns a pokemon list', async () => {
      axios.get.mockReturnValueOnce(Promise.resolve('pokemonResults'));

      await loadPokemons()(dispatch);

      const expectedCall = { pokemonList: undefined, type: 'LOAD_POKEMONS' };

      expect(dispatch.mock.calls[1][0]).toEqual(expectedCall);
    });
  });
});
