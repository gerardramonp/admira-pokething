/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */ // <-- for destructuring later

const debug = require('debug')('app:controller');
const axios = require('axios');

function pokeController(PokeModel) {
  function getPokemons(req, res) {
    const searchQuery = {};
    const selectQuery = {
      id: 1, name: 1, types: 1, species: 1, sprites: 1,
    };
    PokeModel.find(searchQuery, selectQuery,
      (getError, pokemonList) => (getError ? res.send(getError)
        : res.json(pokemonList)));
  }

  async function getPokemonById(req, res) {
    const { pokemonId } = req.params;

    /* Here I use the pokemon API and not my DB just for you to see
       other code examples and different testing. */
    const pokemonDetailEndpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    try {
      // Destructuring of response to discard all the info I don't want
      const {
        data: {
          base_experience, forms, game_indices, held_items, is_default,
          location_area_encounters, order, species, ...data
        },
      } = await axios.get(pokemonDetailEndpoint);

      const { sprites: { back_default, front_default } } = data;

      const pokeData = { ...data, sprites: { front_default, back_default } };

      res.json(pokeData);
    } catch (detailError) {
      res.send(detailError);
    }
  }

  async function getMovesTypes(req, res) {
    const { moves } = req.body;

    let detailedMoves = [];
    let moveEndpoint = '';
    try {
      for (let i = 0; i < moves.length; i++) {
        const { move } = moves[i];
        moveEndpoint = move.url;
        const { data: { name, type } } = await axios.get(moveEndpoint);
        detailedMoves = [...detailedMoves, { name, type }];
      }
      res.json(detailedMoves);
    } catch (error) {
      res.send(error);
    }
  }
  return { getPokemons, getPokemonById, getMovesTypes };
}

module.exports = pokeController;
