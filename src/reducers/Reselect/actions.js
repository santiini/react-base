/**
 * shopping actions
 */
import * as types from './shoppingCar';

export const fetchAll = () => ({
  type: types.GET_ALL,
});

export const add = ({ id, value, name }) => ({
  type: types.ADD_ONE,
  payload: {
    product: { id, value, name },
  },
});

export const update = ({ id, value, name }) => ({
  type: types.UPDATE_ONE,
  payload: {
    id,
    product: { id, value, name },
  },
});

export const remove = (id) => ({
  type: types.DELETE_ONE,
  payload: {
    id,
  },
});

export const finish = (id) => ({
  type: types.FINISH_ONE,
  payload: {
    id,
  },
})

export const changeFilter = (filter) => ({
  type: types.CHANGE_FILTER,
  payload: {
    filter,
  }
})
