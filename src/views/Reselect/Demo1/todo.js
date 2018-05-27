/**
 * todos reselect example
 */
import { createSelector } from 'reselect';

import { filterTypes } from '@/reducers/Reselect/shoppingCar';

// 声明基于基础数据的 selector
const todoSelector = (state) => state.shopping.items;
const filterTypeSelector = (state) => state.shopping.filterType;

const types = filterTypes();

// 结合基础数据，函数计算，确保组件的 props 获取纯粹值

// 传参形式1: 传入 array 作为基础的 state;
export const getFilterTodos = createSelector(
  [todoSelector, filterTypeSelector],
  (todos, filterType) => {
    switch (filterType) {
      case types.all:
        return todos;
      case types.active:
        return todos.filter((todo) => !todo.isCompleted);
      case types.completed:
        return todos.filter((todo) => todo.isCompleted);
      default:
        return todos;
    }
  }
);

// // 传参形式2： 传入一个个参数
// export const getFilterTodos = createSelector(
//   todoSelector, filterTypeSelector,
//   (todos, filterType) => {
//     switch (filterType) {
//       case types.all:
//         return todos;
//       case types.active:
//         return todos.filter((todo) => !todo.isCompleted);
//       case types.completed:
//         return todos.filter((todo) => todo.isCompleted);
//       default:
//         return todos;
//     }
//   }
// );
