import { connect } from 'react-redux';
import ResultsList from '../components/ResultsList';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);
