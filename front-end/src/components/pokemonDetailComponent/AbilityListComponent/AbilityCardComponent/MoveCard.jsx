import React from 'react';
import './MoveCard.css';

function MoveCard({ moveType, moveName }) {
  return (
    <div className={`ability-card ${moveType}`}>
      <p>{moveName}</p>
    </div>
  );
}

export default MoveCard;
