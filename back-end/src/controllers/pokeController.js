function pokeController(PokeModel) {
  function getPokemons(req, res) {
    const searchQuery = {};
    const includeQuery = {
      id: 1, name: 1, types: 1, species: 1, sprites: 1,
    };
    PokeModel.find(searchQuery, includeQuery,
      (getError, pokemonList) => (getError ? res.send(getError)
        : console.log(pokemonList) && res.json(pokemonList)));
  }

  return { getPokemons };
}

module.exports = pokeController;
