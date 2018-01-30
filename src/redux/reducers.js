// 生成 reducers
import { combineReducers } from 'redux';

import { 
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  CLEAR_COMPLETED,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
} from './actionTypes';
// import { getPostDetail } from './actions/demo5';

export const initialState = {
  todos: [
    { id: 1, text: 1, completed: true },
    { id: 2, text: 2, completed: false },
  ],
  filterType: 'SHOW_ALL',
  userInfo: { name: 'sunxiaotao', home: '洛阳', age: 28 },
  tasks: [
    { name: '任务1', id: 1, time: '2018-01018' },
    { name: '任务2', id: 2, time: '2018-01017' },
    { name: '任务3', id: 3, time: '2018-01016' },
  ],
  post: {},
};

// reducer 的拆分 -- 不同函数，对应 state 中部分属性、数据： todos
function todos(state = initialState.todos, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { text: action.text, completed: false, id: action.id },
      ];
    case DELETE_TODO:
      return state.filter(todo => todo.text !== action.text);
    case TOGGLE_TODO:
      return state.map(todo => {
        return todo.id === action.id ? { ...todo, completed: !todo.completed } : todo;
      })
    case CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

// filterType 的 reducers
function filterType(state = initialState.filterType, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}

// task 的 reducers
function tasks(state = initialState.tasks, action) {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        action.task,
      ];
    case EDIT_TASK:
      return state.map(task => {
        // 两种传参的形式： 都可以;
        // return task.id === action.task.id ? Object.assign({}, task, action.task) : task
        const { id, name } = action;
        return task.id === id ? Object.assign({}, task, {name}) : task
      });
    case DELETE_TASK:
      return state.filter(task => task.id !== action.id)
    default:
      return state;
  }
}

// 因为 todos, filterType, tasks 都只是绑定了 initialState 的一部分，导致应用的 state, 并不完全;
function userInfo(state = initialState.userInfo, action) {
  switch (action.type) {
    case 'getUser':
      return state;
    case 'updateUser':
      // tips: 上一次返回的 state 会作为下次的 state, 
      // 所以调用一次后，state 由 initialState --> userInfo, 导致 state.userInfo 报错
      console.log(action.info)
      console.log(state)
      return Object.assign({}, state, action.info);
    default:
      // return state; // 决定 state 上绑定的值;
      return state;
  }
}

function post(state = initialState.post, action) {
  switch (action.type) {
    case 'SAVE_REDUCER':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

const reducers = combineReducers({
  // todos: 对应 state.todus 的 reducers;
  todos,
  filterType,
  tasks,
  userInfo,
  post,
});

export default reducers;