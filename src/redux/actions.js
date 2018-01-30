import { getDetail } from '@/api/cnode.js';
import * as actions from './actionTypes';

// action 函数
/* todos */
export function addTodo(text) {
  // 产生唯一uuid
  const id = Math.random().toString(36).substring(3, 8);
  return {
    type: actions.ADD_TODO,
    text,
    id,
  }
}
export function deleteTodo(text) {
  return {
    type: actions.DELETE_TODO,
    text,
  }
}
export function toggleTodo(id) {
  return {
    type: actions.TOGGLE_TODO,
    id,
  }
}
export function setFilter(filter) {
  return {
    type: actions.SET_FILTER,
    filter,
  }
}
export function clearCompleted() {
  return {
    type: actions.CLEAR_COMPLETED,
  }
}


/* tasks */
export function addTask({name, time = Date().now}) {
  const id = Math.random().toString(36).substring(3, 8);
  console.log(name)
  return {
    type: actions.ADD_TASK,
    task: { name, time, id },
  }
}
export function editTask({ id, name }) {
  return {
    type: actions.EDIT_TASK,
    // task: { id, name },
    id,
    name,
  }
}
export function deleteTask(id) {
  return {
    type: actions.DELETE_TASK,
    id,
  }
}

/* user */
export function getUser() {
  return {
    type: 'getUser',
  }
}
export function updateUser(info) {
  return {
    type: 'updateUser',
    info,
  }
}

//返回一个action对象，用来关联对应的reducer，将data保存到store。
const saveReducer = (data) => ({
  type: 'SAVE_REDUCER',
  data
});

// 方式一: async 的使用 redux-thunk
export const getPostDetail = (id) => async (dispatch, getState) => {
  try {
    console.log('async');
    const state = getState();
    console.log(state);
    const result = await getDetail(id);
    await dispatch(saveReducer(result.data))
  } catch (err) {
    console.log(err);
  }
} 

// 方式2: promise 的方式使用 
// export const getPostDetail = (id) => (dispatch, getState) => {
//   // 2. 异步获取接口信息
//   getDetail(id)
//     .then((result) => {
//       console.log(result)
//       dispatch(saveReducer(result.data))
//     })
//     .catch(err => console.log(err))

//   // 1. 获取 state 的使用;
//   // const state = getState();
//   // console.log(state);
//   // dispatch(saveReducer({}));
// }