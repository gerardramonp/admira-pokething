/* eslint-disable react/style-prop-object */
import React from 'react';

import './PokemonCard.css';

function PokemonCard({ pokemonData }) {
  return (
    <div className={`pokemon-card ${pokemonData.types[0].type.name}`}>
      <div className="row">
        <span className="pokemon__name">{pokemonData.name}</span>
        <span className="pokemon__id">
          #
          {pokemonData.id}
        </span>
      </div>
      <div className="pokemon__info">
        <div className="info__types">
          {pokemonData.types.map(({ type }) => <span key={type.name} className="types__item">{type.name}</span>)}
        </div>
        <img src={pokemonData.sprites.front_default} alt="pokemon-sprite" className="info__img" />
      </div>
      <div className="circle" />
    </div>
  );
}

export default PokemonCard;
