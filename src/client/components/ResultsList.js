import React, { PropTypes } from 'react';

const ResultsList = ( { error, current, previous, next } ) => {
  if (!current) {
    return (
      <div id="results-list" className="col s12 m4 l5">
      </div>
    );
  }
  if (error) {
   return (
      <div id="results-list" className="col s12 m4 l5">
      <p>No results found!</p>
      </div>
    ); 
  }
  return (
    <div id="results-list" className="col s12 m4 l5">
      <div className="button-wrapper">
        <button
          className="left-arrow waves-effect waves-light btn green"
          onClick={previous}
        >
        Previous
        </button>
        <button
          className="right-arrow waves-effect waves-light btn green"
          onClick={next}
        >
        Next
        </button>
      </div>
      <ul>
        <li key={current.place_id}>
          <img src={current.icon} alt="Restaurant" />
          <h5>{current.name}</h5>
          <p>Address: {current.formatted_address}</p>
          <p>Price Level: {current.price_level}</p>
          <p>Rating: {current.rating}</p>
        </li>
      </ul>
    </div>
  );
};

ResultsList.propTypes = {
  error: PropTypes.bool.isRequired,
  current: PropTypes.object,
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default ResultsList;
