import App from '../components/App';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);
