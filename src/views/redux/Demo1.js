import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import * as actions from '../../state/actions';

class Demo1 extends Component {
  changeTodo = (id) => {
    this.props.updateTodo(id, 'change1111');
  }

  render() {
    const list = this.props.list.map((todo) => (
      <div key={todo.id}>
        <div className="">{todo.text}</div>
        <Button onClick={() => this.changeTodo(todo.id)}>改变</Button>
      </div>
    ));
    // this.props.location: 获取 router 中的参数;
    console.log(this.props.location.state);
    // match
    console.log(this.props.match);
    return (
      <div>
        <h4>redux实例1</h4>
        {list}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.todos,
});

// 一般形式的返回值;
const mapDispatchToProps = (dispatch) => ({
  addTodo: (...args) => dispatch(actions.addTodo(...args)),
  findOne: (...args) => dispatch(actions.findTodoById(...args)),
  updateTodo: (...args) => dispatch(actions.updateTodo(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo1);