/**
 * 利用 createReducer 产生 reducer
 */
import createReducer from './createReducer';
import * as types from './action-types';

// 初始化 state
export let initialState = [
  {
    id: 1,
    text: 'todo11',
    completed: true
  },
  {
    id: 2,
    text: 'todo22',
    completed: false
  },
  {
    id: 3,
    text: 'todo33',
    completed: false
  },
  {
    id: 4,
    text: 'todo44',
    completed: true
  },
];

// createReducer 返回函数，相当于 case-functions
const todoReducers = createReducer(initialState, {
  [types.SHOWTODOS](state, action) {
    return state;
  },
  [types.ADDTODO](state, action) {
    return [action.todo, ...state];
  },
  [types.DELETETODO](state, action) {
    return state.filter((todo) => todo.id !== action.id);
  },
  [types.UPDATETODO](state, action) {
    return state.map((todo) => todo.id === action.id ?
      Object.assign({}, todo, {
        text: action.todo
      }) :
      todo);
  },
  [types.FINDTODO](state, action) {
    const ret = state.find((todo) => todo.id === action.id);
    return ret ? ret : {};
  }
});

export default todoReducers;