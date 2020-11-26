import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMoveTypes } from '../../../redux/actions/pokeActions';
import MoveCard from './AbilityCardComponent/MoveCard';
import Loading from '../../LoadingComponent/Loading';

import './MoveList.css';

function MoveList({
  loadingMoves, movesWithType, dispatch, rawMoves,
}) {
  useEffect(() => {
    if (!movesWithType?.length) {
      dispatch(loadMoveTypes(rawMoves));
    }
  });

  return (
    <div className="move-list">
      {loadingMoves && <Loading />}
      {movesWithType?.length && movesWithType.map((move) => (
        <MoveCard moveType={move.type.name} moveName={move.name} />
      ))}
    </div>
  );
}

function mapStateToProps({ pokeReducer }) {
  debugger;
  return {
    loadingMoves: pokeReducer.loadingMoves,
    movesWithType: pokeReducer.movesWithType,
  };
}

export default connect(mapStateToProps)(MoveList);
