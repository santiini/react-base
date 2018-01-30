import React, { Component } from 'react';

import Todo from './Todo';
import InputWrapper from './InputWrapper';
import FilterLink from '../containers/demo1/FilterLink'
import './demo1.css';

export default class Demo1 extends Component {
  state = {
    currentVal: '',
  };

  addTodo = (val) => {
    // const length = this.props.todos.length;
    this.props.handleAdd(val);
  }

  deleteTodo = (text) => {
    // console.log(`删除${text}`)
    this.props.handleDelete(text);
  }

  toggleTodo = (id) => {
    this.props.toggleTodo(id);
  }

  componentDidMount() {
    // 获取从其他页面获取的参数:
    // console.log(this.props.location.state);
    // 从 redux 中获取 state
    // console.log(this.props);
  }

  render() {
    // const todos = this.props.todos.map((todo) => <li>{todo}</li>)
    const { todos, leftNum, clearCompleted } = this.props;
    return (
      <div className="demo1">
        <InputWrapper val={this.state.currentVal} changeHandle={this.addTodo} />
        <h4>Demo1</h4>
        <div className="todo-list">
          <ul className="">
            {
              // 形式1： 没有子组件
              // todos.map((todo,i) => <li key={i}>{todo && todo.text}</li>)
              // 形似2： 使用子组件
              todos.map((todo,i) => 
                <Todo
                  key={i} 
                  item={todo}
                  changeStatus={this.toggleTodo}
                  handleDelete={this.deleteTodo} 
                />
              )}
          </ul>
          <div className="opt-group">
            <div className="todos-tips">{leftNum} todos left</div>
            <div className="toggle-type">
              {/* <div className="">All</div>
              <div className="">Active</div>
              <div className="">Completed</div> */}
              <FilterLink filter="SHOW_ALL">All</FilterLink>
              <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
              <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
            </div>
            <div className="todos-clear" onClick={() => clearCompleted()}>clear completed</div>
          </div>
        </div>
        <div className="add-todo">
          {/* <button onClick={this.addTodo}>添加Todo</button> */}
        </div>
      </div>
    )
  }
}