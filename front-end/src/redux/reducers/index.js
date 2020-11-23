import { combineReducers } from 'redux';
import pokeReducer from './pokeReducer';

const rootReducer = combineReducers({ pokeReducer });

export default rootReducer;
