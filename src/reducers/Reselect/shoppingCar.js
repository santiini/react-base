/**
 * reselect 简单例子
 */
export const GET_ALL = 'GET_ALL';
export const UPDATE_ONE = 'UPDATE_ONE';
export const ADD_ONE = 'ADD_ONE';
export const DELETE_ONE = 'DELETE_ONE';

 const initialState = {
  items: [
    { value: 112, id: 1, name: '大米' },
    { value: 223, id: 2, name: '小麦' },
    { value: 88, id: 3, name: '玉米' },
    { value: 321, id: 4, name: '黄豆' },
  ],
  taxPercent: 8,
 };

 const shopping = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return state;
    case ADD_ONE:
      return {
        taxPercent: state.taxPercent,
        items: [...state.items, action.payload.product],
      }
    case UPDATE_ONE:
      return {
        taxPercent: state.taxPercent,
        items: state.items.map((item) => item.id === action.payload.id
          ? Object.assign({}, action.payload.product)
          : item
        ),
      };
    case DELETE_ONE:
      return {
        taxPercent: state.taxPercent,
        items: state.items.filter((item) => item.id !== action.payload.id),
      }
    default:
      return state;
  }
 };

 export default shopping;
