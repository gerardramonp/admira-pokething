import axios from 'axios';
import loadPokemons from './pokeActions';

describe('pokeActions test', () => {
  describe('loadPokemons action-creator tests', () => {
    let dispatch = null;
    beforeEach(() => {
      dispatch = jest.fn();
    });

    test('Should call dispatch with setLoading', () => {
      loadPokemons()(dispatch);
    });
  });
});
