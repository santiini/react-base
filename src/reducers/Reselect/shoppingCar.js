/**
 * reselect 简单例子
 */
// actions
export const GET_ALL = 'GET_ALL';
export const UPDATE_ONE = 'UPDATE_ONE';
export const ADD_ONE = 'ADD_ONE';
export const DELETE_ONE = 'DELETE_ONE';
export const FINISH_ONE = 'FINISH_ONE';
export const CHANGE_FILTER = 'CHANGE_FILTER';

// filterTypes
export const filterTypes = () => ({
  all: 'SHOW_ALL',
  active: 'SHOW_ACIVE',
  completed: 'SHOW_COMPLETED',
});

const initialState = {
  items: [
    { value: 11, id: 1, name: '任务1', isCompleted: false },
    { value: 22, id: 2, name: '任务2', isCompleted: false },
    { value: 33, id: 3, name: '任务3', isCompleted: true },
    { value: 44, id: 4, name: '任务4', isCompleted: false },
  ],
  taxPercent: 8,
  filterType: 'all',
};

const shopping = (state = initialState, action) => {
  const { items, taxPercent, filterType } = state;
  // payload 参数并不是必然存在的;
  const { product, id, filter } = action.payload || {};
  switch (action.type) {
    case GET_ALL:
      return state;
    case ADD_ONE:
      return {
        taxPercent,
        filterType,
        items: [...items, product],
      }
    case UPDATE_ONE:
      return {
        taxPercent,
        filterType,
        items: items.map((item) => item.id === id
          ? Object.assign({}, product)
          : item
        ),
      };
    case DELETE_ONE:
      return {
        taxPercent,
        filterType,
        items: items.filter((item) => item.id !== id),
      }
    case FINISH_ONE:
      return {
        taxPercent,
        filterType,
        items: items.map((item) => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item),
      }
    case CHANGE_FILTER:
      return {
        taxPercent,
        items,
        filterType: filterTypes()[filter] || filterTypes().all,
      }
    default:
      return state;
  }
};

export default shopping;
