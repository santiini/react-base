import { connect } from 'react-redux';

import Link from '@/views/demo1/Link';
import { setFilter } from '@/redux/actions';

const mapStateToProps = (state, ownProps) => ({
  active: state.filterType === ownProps.filter,
});

const mapActionsToProps = (dispatch, ownProps) => ({
  handleLink: () => {
    // console.log(ownProps.filter)
    dispatch(setFilter(ownProps.filter));
  },
});

export default connect(mapStateToProps, mapActionsToProps)(Link);