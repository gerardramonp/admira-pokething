function pokeController(PokeModel) {
    const pokeApiURL = "https://pokeapi.co/api/v2/";
    function getPokemons(req, res) {
        const query = {};

        PokeModel.find(query, (getError, pokemonList) => {
            return getError ? res.send(getError) : res.json(pokemonList);
        });
    }

    return { getPokemons };
}

module.exports = pokeController;
