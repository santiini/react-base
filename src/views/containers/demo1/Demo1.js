import { connect } from 'react-redux';  

import { addTodo, deleteTodo, toggleTodo, clearCompleted } from '@/redux/actions'
import Demo1 from '@/views/demo1/Demo1';

// 根据 state.filterType 获取 todos
const getFilterTodos = (todos, filter) => {
  // console.log(todos)
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => !todo.completed)
    default:
      return [];
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // todos: state.todos,
    todos: getFilterTodos(state.todos, state.filterType),
    leftNum: state.todos.filter(todo => !todo.completed).length,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAdd: (text) => {
      dispatch(addTodo(text));
    },
    handleDelete: (text) => {
      dispatch(deleteTodo(text));
    },
    toggleTodo: (id) => {
      dispatch(toggleTodo(id));
    },
    clearCompleted: () => {
      dispatch(clearCompleted());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo1);