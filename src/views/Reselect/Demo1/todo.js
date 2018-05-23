/**
 * todos reselect example
 */
import { createSelector } from 'reselect';

import { filterTypes } from '@/reducers/Reselect/shoppingCar';

const todoSelector = (state) => state.shopping.items;

const filterTypeSelector = (state) => state.shopping.filterType;

const types = filterTypes();

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
