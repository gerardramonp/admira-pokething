const { Router } = require('express');
const pokeController = require('../controllers/pokeController');

function pokeRouter(PokeModel) {
  const router = Router();

  const controller = pokeController(PokeModel);

  router.route('/').get(controller.getPokemons);

  router.route('/details/:pokemonId').get(controller.getPokemonById);

  router.route('/moves').post(controller.getMovesTypes);

  return router;
}

module.exports = pokeRouter;
