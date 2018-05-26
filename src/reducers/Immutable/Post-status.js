/**
 * Immutable 在 react 中的使用
 */
import Immutable, { Map, List } from 'immutable';

import createReducer from '../createReducer';

// 当前业务
export const resource = 'POST';
// 请求的operate
export const requestOpt = (operate) => `${operate.toLocaleUpperCase()}_${resource}_REQUEST`;
// 成功后的operate
export const successOpt = (operate) => `${operate.toLocaleUpperCase()}_${resource}_SUCCESS`;
// 失败后的operate
export const failureOpt = (operate) => `${operate.toLocaleUpperCase()}_${resource}_FAILURE`;

// 路径
const requestPath = 'isRequesting'; // 请求状态path
const successPath = 'isSuccessed'; // 成功状态path
const errorPath = 'error'; // error path
const dataPath = ['resource', 'data']; // 数据修改 path

// 请求状态执行操作
const requestStatus = (state) => {
  if (!state) {
    throw new Error('请传入state对象');
  }
  state.set(requestPath, true)
    .set(successPath, false)
    .set(errorPath, undefined);
};
// 成功状态执行操作
const successStatus = (state) => {
  if (!state) {
    throw new Error('请传入state对象');
  }
  state.set(requestPath, false)
    .set(successPath, true)
    .set(errorPath, undefined);
};
// 失败状态执行操作
const failureStatus = (state, error) => {
  if (!state) {
    throw new Error('请传入state对象');
  }
  state.set(requestPath, false)
    .set(successPath, false)
    .set(errorPath, error);
};

const initialState = Immutable.fromJS({
  resource: {
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
  },
  isFailure: false,
  isSuccessed: false,
  isRequesting: false,
  error: null,
});

// handlers 匹配 action.type, 执行对应的 reducer
export default createReducer(initialState, {
  // 1. 获取列表：
  [requestOpt('fetch')](state, action) {
    // state.widthMutations 可以处理 immutable 操作;
    return state.withMutations(requestStatus);
  },
  [successOpt('fetch')](state, action) {
    return state.withMutations((state) => {
      const { data } = action.payload.data;
      successStatus(state);
      // tips: 注意在 Immutable-redux 中，要保证向 redux 中更新、插入数据时，必须使用 Immutable.formJS 转化为 Immutable 类型;
      state.setIn(dataPath, Immutable.fromJS(data));
      // state.setIn(['resource', 'data'], data);
    })
  },
  [failureOpt('fetch')](state, action) {
    return state.withMutations((state) => {
      const error = action.payload.error;
      failureStatus(error);
    })
  },
  // 2. 删除
  [requestOpt('delete')](state, action) {
    return state.withMutations((state) => {
      state.set(requestPath, true);
    });
  },
  [successOpt('delete')](state, action) {
    return state.withMutations((state) => {
      const { id } = action.payload.data;
      const data = state.getIn(dataPath)
        // .filter((value, key) => value.get('id') !== id);
        // tips: 说明在 filter 函数中，value 仍然是 Immutable 类型数据;
        .filter((value, key) => {
          console.log(value);
          console.log(key);
          return value.get('id') !== id;
        })
      state.setIn(dataPath, data)
        .set(requestPath, false);
    });
  },
  [successOpt('delete')](state, action) {
    return state.withMutations((state) => {
      const { error } = action.payload;
      state.set(requestPath, false)
        .set('isFailure', true)
        .set(errorPath, error);
    })
  },
  // 3. update
  [requestOpt('update')](state, action) {
    return state.set(requestPath, true);
  },
  [successOpt('update')](state, action) {
    return state.withMutations((state) => {
      const { id, post } = action.payload.data;
      const index = state.getIn(dataPath).findIndex((item) => item.get('id') === id);
      // tips: 往 state 中插入、改变数据时，记得保持 Immutable 数据形式;
      state.updateIn(['resource', 'data', index], item => item.set('name', post.name))
        // state.updateIn(['resource', 'data', index], item => Immutable.fromJS(post))
        .set(requestPath, false)
        .set('isFailure', false);
    });
  },
  [failureOpt('update')](state, action) {
    const { error } = action.payload;
    return state.set(requestPath, false)
      .set(errorPath, error);
  },
  // 4. add
  [requestOpt('add')](state, action) {
    return state.set('isRe')
  },
  [successOpt('add')](state, action) {

  },
  [failureOpt('add')](state, action) {

  },
  // 5. find
});