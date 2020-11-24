const { Router } = require('express');
const pokeController = require('../controllers/pokeController');

function pokeRouter(PokeModel) {
  const router = Router();

  const controller = pokeController(PokeModel);

  router.route('/').get(controller.getPokemons);

  router.route('/details/:pokemonId').get(controller.getPokemonById);

  return router;
}

module.exports = pokeRouter;
