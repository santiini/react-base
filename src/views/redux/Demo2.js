import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import * as actions from '../../state/actions';

class Demo2 extends Component {
  changeTodo = (id) => {
    this.props.updateTodo(id, 'change22222');
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
        <h4>redux实例2</h4>
        {list}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.todos,
});

// bindActionCreators 函数实现的dispatch，指定映射关系;
const mapDispatchToProps = (dispatch) => bindActionCreators({
  addTodo: actions.addTodo,
  findOne: actions.findTodoById,
  updateTodo: actions.updateTodo,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Demo2);