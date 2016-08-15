import {
  SEARCH_PLACES,
} from '../actions/ActionTypes';

const searchState = (state = {
  searchterm: '',
}, action) => {
  switch (action.type) {
    case SEARCH_PLACES:
      return Object.assign({}, state, {
        state: action.state,
        searchterm: action.searchTerm,
      });
    default:
      return state;
  }
};

export { searchState };
