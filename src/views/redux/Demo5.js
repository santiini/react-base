import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
// import * as actions from '../../state/actions';
import * as types from '../../state/action-types';

@connect((state) => ({
  list: state.todos,
}))
class Demo5 extends Component {
  changeTodo = (id) => {
    console.log(this.props);
    // 方式1-diapath： 参数为函数
    // this.props.dispatch(actions.updateTodo(id, 'change5555'));
    // 方式2-diapath： 参数是对象， 其实就是 actions.updateTodo 函数的返回值的直接传递
    this.props.dispatch({
      type: types.UPDATETODO,
      id,
      todo: 'change55554444',
    });
  }

  toLink = () => {
    // 利用 this.props.history 实现路由的跳转;
    this.props.history.push({
      pathname: '/redux1',
      state: {
        name: 'test1',
        list: [1, 2, 3],
      }
    });
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
        <h4>redux实例5</h4>
        {list}
        <div className="">
          <Button onClick={this.toLink}>toRedux1</Button>
        </div>
      </div>
    );
  }
}


export default Demo5;