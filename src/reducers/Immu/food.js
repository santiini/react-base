/**
 * Immutable.js 优化: shopping-car
 */
import Immutable from 'immutable';

import createReducer from '../createReducer';

// 声明当前模块
export const resource = 'SHOPPING';

// State 初始化
const initialState = Immutable.fromJS({
  isRequesting: false,
  isSuccessed: false,
  // isFailure: false,
  error: undefined,
  list: [
    { id: 1, name: '食物11', type: 1, followers: 345, price: 12 },
    { id: 2, name: '食物22', type: 1, followers: 687, price: 435 },
    { id: 3, name: '食物33', type: 1, followers: 954, price: 24 },
    { id: 4, name: '水果11', type: 2, followers: 825, price: 546 },
    { id: 5, name: '水果22', type: 2, followers: 738, price: 678 },
    { id: 6, name: '水果33', type: 2, followers: 621, price: 345 },
    { id: 7, name: '主食11', type: 3, followers: 352, price: 88 },
    { id: 8, name: '主食22', type: 3, followers: 256, price: 98 },
    { id: 9, name: '主食33', type: 3, followers: 142, price: 34 },
  ],
  total: 10,
});

// Immutable 对应的资源路径
const requestPath = 'isRequesting';
const successPath = 'isSuccessed';
// const failurePath = 'isFailure';
const errorPath = 'error';
const dataPath = 'list';
const totalPath = 'total';

// 成功的operate: 改变 Reducer
export const shoppingType = (operate) => `${operate.toLocaleUpperCase()}_${resource}`;
// 成功状态的reducer
export const successStatus = (shoppingState, action, cb) => {
  // 1. 不传递参数时，payload 默认 {}
  // 2. 其他需要的属性，都在 action.payload.data 上;
  const { data } = action.payload || {};
  const newState = shoppingState.withMutations((state) => {
    state.set(requestPath, false)
      .set(successPath, true)
      .set(errorPath, undefined);
  });
  return !cb ? newState : (cb(newState, data) || newState); 
}

// handlers 匹配 action.type, 执行对应的 reducer 函数
export default createReducer(initialState, {
  // 请求时处理
  [`${resource}_REQUEST`](shoppingState, action) {
    return shoppingState.withMutations((state) => {
      state.set(requestPath, true)
        .set(successPath, false)
        .set(errorPath, undefined);
    });
  },
  // 失败时处理
  [`${resource}_FAILURE`](shoppingState, action) {
    const { error } = action.payload.data;
    return shoppingState.withMutations((state) => {
      state.set(requestPath, false)
        .set(successPath, false)
        .set(totalPath, 0)
        .set(errorPath, error);
    });
  },
  // fetch
  [shoppingType('fetch')](shoppingState, action) {
    return successStatus(shoppingState, action, (state, data) => {
      console.log(data)
      return state.set(dataPath, data.list).set(totalPath, 66);
    });

    // 原始方法:
    // const { list } = action.payload.data;
    // return shoppingState.withMutations((state) => {
    //   state.set(successPath, true)
    //     .set(errorPath, undefined)
    //     .set(dataPath, list)
    //     .set(totalPath, 99);
    // });
  },
})
