// reducers
import { combineReducers } from 'redux';

import * as types from './action-types';

// 初始化 state
export let initialState = {
  todos: [
    { id: 1, text: 'todo11', completed: true },
    { id: 2, text: 'todo22', completed: false },
    { id: 3, text: 'todo33', completed: false },
    { id: 4, text: 'todo44', completed: true },
  ],
  todo: {},
  users: [
    { id: 1, name: 'sun', address: '海淀' },
    { id: 2, name: 'xiao', address: '大兴' },
    { id: 3, name: 'tao', address: '昌平' },
    { id: 4, name: 'wang', address: '洛阳' },
  ],
  user: {},
};

// reducer 的拆分 -- 不同函数，对应 state 中部分属性、数据： todos, users

function todos(state = initialState.todos, action) {
  switch (action.type) {
    case types.SHOWTODOS:
      return state;
    case types.ADDTODO:
      return [action.todo, ...state];
    case types.DELETETODO:
      return state.filter((todo) => todo.id !== action.id);
    case types.UPDATETODO:
      return state.map((todo) => todo.id === action.id ? Object.assign({}, todo, { text: action.todo }) : todo);
    // return state.map((todo) => {
    //   return todo.id === action.id ? Object.assign({}, todo, action.todo) : todo;
    // });
    case types.FINDTODO:
      const result = state.find((todo) => todo.id === action.id)
      return result ? result : {};
    default:
      return state;
  }
}

function users(state = initialState.user, action) {
  switch (action.type) {
    case types.SHOWUSERS:
      return state;
    case types.ADDUSER:
      return [action.user, ...state];
    case types.DELETEUSER:
      return state.filter((user) => user.id !== action.id);
    case types.UPDATEUSER:
      return state.map((user) => user.id === action.id ? Object.assign({}, user, action.user) : user);
    // return state.map((user) => {
    //   return user.id === action.id ? Object.assign({}, user, action.user) : user;
    // });
    case types.FINDUSER:
      const result = state.find((user) => user.id === action.id)
      return result ? result : {};
    default:
      return state;
  }
}

export default combineReducers({
  todos,
  users,
});