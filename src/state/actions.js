import { getDetail } from '@/api/cnode.js';
import * as types from './action-types';

// action 函数
// users: function
export function getAllTodos() {
  return {
    type: types.SHOWTODOS,
  };
}
export function addTodo(text) {
  // 产生唯一uuid
  const id = Math.random().toString(36).substring(3, 8);
  return {
    type: types.ADDTODO,
    text,
    id,
  };
}
export function deleteTodo(id) {
  return {
    type: types.DELETETODO,
    id,
  };
}
export function updateTodo({ id, todo }) {
  // export function updateTodo(id, todo) {
  return {
    type: types.UPDATETODO,
    id,
    todo,
  };
}
export function findTodoById(id) {
  return {
    type: types.FINDTODO,
    id,
  }
}

// users: 箭头函数
export function getAllUsers() {
  return {
    type: types.SHOWUSERS,
  };
}
export function addUser(text) {
  // 产生唯一uuid
  const id = Math.random().toString(36).substring(3, 8);
  return {
    type: types.ADDUSER,
    text,
    id,
  };
}
export function deleteUser(id) {
  return {
    type: types.DELETEUSER,
    id,
  };
}
export function updateUser(id, user) {
  return {
    type: types.UPDATEUSER,
    id,
    user,
  };
}
export function findUserById(id) {
  return {
    type: types.FINDUSER,
    id,
  }
}

// api: async 异步函数
// 方式一: async 的使用 redux-thunk
export const getPostDetail = (id) => async (dispatch, getState) => {
  try {
    const state = getState();
    const result = await getDetail(id);
    // await dispatch(saveReducer(result.data))
    console.log(state);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
} 