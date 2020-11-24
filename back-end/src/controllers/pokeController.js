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

  return { getPokemons };
}

module.exports = pokeController;
