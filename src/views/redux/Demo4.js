import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import * as actions from '../../state/actions';

class Demo4 extends Component {
  changeTodo = (id) => {
    console.log(this.props);
    // this.props.updateTodo(id, 'change3333');
    this.props.dispatch(actions.updateTodo(id, 'change4444'));
  }

  render() {
    const list = this.props.list.map((todo) => (
      <div key={todo.id}>
        <div className="">{todo.text}</div>
        <Button onClick={() => this.changeTodo(todo.id)}>改变</Button>
      </div>
    ));
    return (
      <div>
        <h4>redux实例4</h4>
        {list}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.todos,
});

// 对象形式的mapDispatch: 
// const mapDispatchToProps = {
//   ...actions,
// };

export default connect(mapStateToProps)(Demo4);