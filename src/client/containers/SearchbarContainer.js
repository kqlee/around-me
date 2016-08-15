import { connect } from 'react-redux';
import Searchbar from '../components/Searchbar';
import { executeSearch } from '../actions/Search';

const mapStateToProps = state => {
  const { searchState } = state;
  return {
    searchState,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  searchTerms: e => {
    e.preventDefault();
    return dispatch(executeSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
