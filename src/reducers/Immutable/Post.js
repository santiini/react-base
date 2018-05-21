/**
 * Immutable 在 react 中的使用
 */
import Immutable from 'immutable';

import createReducer from '../createReducer';

const resource = 'POST';

const initialState = Immutable.fromJS({
  data: [
    { name: '第1项', id: 11 },
    { name: '第2项', id: 12 },
    { name: '第3项', id: 13 },
    { name: '第4项', id: 14 },
    { name: '第5项', id: 15 },
    { name: '第6项', id: 16 },
    { name: '第7项', id: 17 },
    { name: '第8项', id: 18 },
    { name: '第9项', id: 19 },
  ],
  isFailure: false,
  isSuccessed: false,
  isRequesting: false,
});

// handlers 匹配 action.type, 执行对应的 reducer
export default createReducer(initialState, {
  [`FETCH_${resource}_REQUEST`](state, action) {
    // state.widthMutations 可以处理 immutable 操作;
    return state.withMutations((state) => {
      // 操作 state
      state.set('isRequesting', true);
    });
  },
  [`FETCH_${resource}_SUCCESS`](state, action) {
    const data = action.playload.data;
    state.set('isRequestion', false)
      .set('isSuccessed', true);
    data.forEach((item) => {
      state.setIn(['data', item.id.toString()], item);
    });
  }
});