import React, { PropTypes } from 'react';

const Searchbar = ({ searchPlaces }) => (
  <div className="searchbar col s12 m4 l5">
    <input id="search-input" placeholder="Search for your next meal">
    </input>
    <select id="option-dropdown" className="browser-default" defaultValue="">
      <option value="" disabled>Choose your option</option>
      <option value="restaurant">Restaurant</option>
      <option value="cafe">Cafe</option>
      <option value="meal_takeaway">Takeout</option>
    </select>
    <button
      id="search-button"
      className="waves-effect waves-light btn blue"
      onClick={searchPlaces}
    >
    Search
    </button>
  </div>
);

Searchbar.propTypes = {
  searchPlaces: PropTypes.func.isRequired,
};

export default Searchbar;