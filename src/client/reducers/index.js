import { combineReducers } from 'redux';
import { searchState } from './Search';

const rootReducer = combineReducers({
  searchState,
});

export default rootReducer;
