import React, { PropTypes } from 'react';

const Searchbar = ({ searchTerms }) => (
  <div>
    <input id="searchInput"></input>
    <button
      id="search-button"
      onClick={searchTerms}
    >Search</button>
  </div>
);

Searchbar.propTypes = {
  searchTerms: PropTypes.func.isRequired,
};

export default Searchbar;