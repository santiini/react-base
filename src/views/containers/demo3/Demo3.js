
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Demo3 from '@/views/demo3/Demo3';
import { addTask, editTask, deleteTask } from '@/redux/actions';

const mapStateToProps = (state, ownProps) => ({
  taskList: state.tasks,
});

// bindActionCreators
// 绑定 以 { key: value } 形式绑定 action 函数到props, 并以 dispatch(action.type, args) 形式调用;
const mapDispatchToProps =  (dispatch, ownProps) => ({
  actions: bindActionCreators({
    addTask, editTask, deleteTask,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo3);