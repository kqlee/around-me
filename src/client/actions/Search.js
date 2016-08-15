import {
  SEARCH_PLACES,
} from './ActionTypes';

// Action creators
const searchPlaces = (type, searchterm) => ({
  type,
  searchterm,
});

// Actions
const executeSearch = () =>
  dispatch => {
    const searchQuery = document.querySelector('#searchInput').value;
    dispatch(searchPlaces(SEARCH_PLACES, searchQuery));
  };

export {
  executeSearch,  
};
