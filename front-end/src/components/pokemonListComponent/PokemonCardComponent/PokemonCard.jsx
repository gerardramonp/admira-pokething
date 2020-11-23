import React from 'react';

import './PokemonCard.css';

function PokemonCard({ pokemonData }) {
  return (
    <div className={`pokemon-card ${pokemonData.types[0].type.name}`}>
      <p>{pokemonData.name}</p>
      <img src={pokemonData.sprites.front_default} alt="" />
    </div>
  );
}

export default PokemonCard;
