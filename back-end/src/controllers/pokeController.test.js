const pokeModel = require('../models/pokeModel');
const PokeModel = require('../models/pokeModel');
const pokeController = require('./pokeController')(PokeModel);

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
});
