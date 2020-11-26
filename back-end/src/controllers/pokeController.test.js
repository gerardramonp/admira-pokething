const axios = require('axios');
const PokeModel = require('../models/pokeModel');
const pokeController = require('./pokeController')(PokeModel);

jest.mock('axios');

describe('PokeController tests', () => {
  afterEach(() => {
    axios.get.mockClear();
  });
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
    test('Should call res.send with an error qhen no req or req.params', async () => {
      const res = {
        send: jest.fn(),
      };

      await pokeController.getPokemonById(undefined, res);

      expect(res.send.mock.calls[0][0]).toBe('req params is required');
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

    test('Should call res.send with an error when req params has wrong properties', async () => {
      const req = { params: -1 };
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

  describe('getMovesTypes tests', () => {
    test('Should call res.send with an error when there is not a req.body', async () => {
      const res = {
        send: jest.fn(),
      };

      await pokeController.getMovesTypes(undefined, res);

      expect(res.send.mock.calls[0][0]).toBe('req body is required');
    });

    test('Should call res.send with an error when axios throws error', async () => {
      const req = { body: { moves: [{ move: { url: 'someURL' } }] } };
      const res = {
        send: jest.fn(),
      };

      axios.get.mockReturnValueOnce(Promise.reject(new Error('Error loading move types')));

      await pokeController.getMovesTypes(req, res);

      expect(res.send.mock.calls[0][0].message).toBe('Error loading move types');
    });

    test('Should call res.json with detailedMoves when all goes well', async () => {
      const req = { body: { moves: [{ move: { url: 'someURL' } }] } };
      const res = {
        json: jest.fn(),
      };
      const moveMock = { data: { name: 'grow', type: 'grass' } };
      axios.get.mockReturnValueOnce(Promise.resolve(moveMock));

      await pokeController.getMovesTypes(req, res);
      const expectValue = [moveMock.data];
      expect(res.json).toHaveBeenCalledWith(expectValue);
    });
  });
});
