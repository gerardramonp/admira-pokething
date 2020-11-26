import React from 'react';

function AbilityCard({ pokemonType, abilityName }) {
  return (
    <div className={`ability-card ${pokemonType}`}>
      <p>{abilityName}</p>
    </div>
  );
}

export default AbilityCard;
