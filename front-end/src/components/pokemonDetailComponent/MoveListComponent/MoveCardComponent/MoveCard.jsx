import React from 'react';
import './MoveCard.css';

function MoveCard({ moveType, moveName }) {
  return (
    <div className={`move-card ${moveType}`}>
      <p>{moveName}</p>
    </div>
  );
}

export default MoveCard;
