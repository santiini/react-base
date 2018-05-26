/**
 * immutable-reselect
 */
import Immutable from 'immutable';

// actions
export const GET_ALL = 'GET_ALL';
export const UPDATE_ONE = 'UPDATE_ONE';
export const ADD_ONE = 'ADD_ONE';
export const DELETE_ONE = 'DELETE_ONE';
export const FINISH_ONE = 'FINISH_ONE';
export const CHANGE_FILTER = 'CHANGE_FILTER';

const types = {
  all: 'SHOW_ALL',
  active: 'SHOW_ACIVE',
  completed: 'SHOW_COMPLETED',
};

// filterTypes
export const filterTypes = () => (types);

const initialState = Immutable.fromJS({
  todos: [
    { value: 11, id: 1, name: '任务1', isCompleted: false },
    { value: 22, id: 2, name: '任务2', isCompleted: false },
    { value: 33, id: 3, name: '任务3', isCompleted: true },
    { value: 44, id: 4, name: '任务4', isCompleted: false },
  ],
  filterType: types.all,
});

const shopping = (state = initialState, action) => {
  const { items, filterType } = state;
  // payload 参数并不是必然存在的;
  const { todo, id, filter } = action.payload || {};
  switch (action.type) {
    case GET_ALL:
      return state;
    case ADD_ONE:
      return state.update('todos', (todos) => todos.push());
    case UPDATE_ONE:
      // return {
      //   filterType,
      //   items: items.map((item) => item.id === id
      //     ? Object.assign({}, todo)
      //     : item
      //   ),
      // };
      return state.update('todos', (items) => items.map((item) => item.get('id') === id ? todo : item));
    case DELETE_ONE:
      // return {
      //   filterType,
      //   items: items.filter((item) => item.id !== id),
      // }
      return state.update('todos', (items) => items.filter((item) => item.get('id') !== id));
    case FINISH_ONE:
      // return {
      //   filterType,
      //   items: items.map((item) => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item),
      // }
      return state.update('items', items.map((item) => {
        if (item.get('id') === id) {
          item.set('idCompleted', !item.get('isCompleted'));
        }
        return item;
      }));
    case CHANGE_FILTER:
      return {
        items,
        filterType: filterTypes()[filter] || filterTypes().all,
      }
    default:
      return state;
  }
};

export default shopping;
