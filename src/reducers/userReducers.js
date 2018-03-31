/**
 * 拆分 reducers: user
 */
import createReducer from './createReducer';
import * as types from './action-types';

export const initialState = [
  {
    id: 1,
    name: 'sun',
    address: '海淀'
  },
  {
    id: 2,
    name: 'xiao',
    address: '大兴'
  },
  {
    id: 3,
    name: 'tao',
    address: '昌平'
  },
  {
    id: 4,
    name: 'wang',
    address: '洛阳'
  },
];

const userReducers = createReducer(initialState, {
  [types.SHOWUSERS](state, action) {
    return state;
  },
  [types.ADDUSER](state, action) {
    return [action.user, ...state];
  },
  [types.DELETEUSER](state, action) {
    return state.filter((user) => user.id !== action.id);
  },
  [types.UPDATEUSER](state, action) {
    return state.map((user) => user.id === action.id ?
      Object.assign({}, user, action.user) :
      user
    );
  },
  [types.FINDTODO](state, action) {
    const ret = state.find((user) => user.id === action.id);
    return ret ? ret : {};
  }
});

export default userReducers;