const axios = require('axios');
const PokeModel = require('../models/pokeModel');
const pokeController = require('./pokeController')(PokeModel);

jest.mock('axios');

describe('PokeController tests', () => {
  describe('getPokemons method tests', () => {
    test('Should call res.send with an error when find throws error', () => {
      const req = {};
      const res = {
        send: jest.fn(),
      };

      PokeModel.find = jest.fn().mockImplementationOnce((searchQuery, selectQuery, callback) => {
        callback('error message', null);
      });

      pokeController.getPokemons(req, res);

      expect(res.send).toHaveBeenCalledWith('error message');
    });

    test('Should call res.json with a pokemon list if there is no error', () => {
      const req = {};
      const res = {
        json: jest.fn(),
      };

      const pokemonList = [{ name: 'pikachu' }, { name: 'charmander' }];

      PokeModel.find = jest.fn().mockImplementationOnce((searchQuery, selectQuery, callback) => {
        callback(false, pokemonList);
      });

      pokeController.getPokemons(req, res);

      expect(res.json).toHaveBeenCalledWith(pokemonList);
    });
  });

  describe('getPokemonById method tests', () => {
    afterEach(() => {
      axios.get.mockClear();
    });

    test('Should call res.send with an error when axios throws error', async () => {
      const req = { params: 1 };
      const res = {
        send: jest.fn(),
      };

      axios.get.mockReturnValueOnce(Promise.reject(new Error('Error loading pokemon')));

      await pokeController.getPokemonById(req, res);

      expect(res.send.mock.calls[0][0].message).toBe('Error loading pokemon');
    });

    test('Should call res.send with an error when response has missing properties', async () => {
      const req = { params: 0 };
      const res = {
        send: jest.fn(),
      };

      axios.get.mockReturnValueOnce(Promise.reject(new Error('Request failed with status code 404')));

      await pokeController.getPokemonById(req, res);

      expect(res.send.mock.calls[0][0].message).toBe('Request failed with status code 404');
    });

    test('Should call res.json with pokemon data if getting the correct response', async () => {
      const req = { params: 1 };
      const res = {
        json: jest.fn(),
        send: jest.fn(),
      };

      const pokeMock = {
        data: {
          base_experience: 1,
          forms: [],
          game_indices: [],
          held_items: [],
          is_default: 1,
          location_area_encounters: [],
          order: 1,
          species: [],
          sprites: {
            back_default: 'asd',
            front_default: 'asd',
          },
          randomProps: 'value',
        },
      };

      axios.get.mockReturnValueOnce(Promise.resolve(pokeMock));

      await pokeController.getPokemonById(req, res);

      const expectValue = {
        sprites: {
          back_default: 'asd',
          front_default: 'asd',
        },
        randomProps: 'value',
      };

      expect(res.json).toHaveBeenCalledWith(expectValue);
    });
  });
});
