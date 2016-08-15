import { connect } from 'react-redux';
import MapCanvas from '../components/MapCanvas';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MapCanvas);
