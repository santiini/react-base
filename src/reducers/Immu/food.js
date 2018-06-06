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
    { id: 2, name: '食物22', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 99, goods: '货物描述1', type: 1, followers: 687, price: 435 },
    { id: 3, name: '食物33', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 213, goods: '货物描述2', type: 1, followers: 954, price: 24 },
    { id: 1, name: '食物11', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 44, goods: '货物描述3', type: 1, followers: 345, price: 12 },
    { id: 4, name: '水果11', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 21, goods: '货物描述4', type: 2, followers: 825, price: 546 },
    { id: 5, name: '水果22', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 17, goods: '货物描述5', type: 2, followers: 738, price: 678 },
    { id: 6, name: '水果33', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 43, goods: '货物描述6', type: 2, followers: 621, price: 345 },
    { id: 7, name: '主食11', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 64, goods: '货物描述7', type: 3, followers: 352, price: 88 },
    { id: 8, name: '主食22', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 74, goods: '货物描述8', type: 3, followers: 256, price: 98 },
    { id: 9, name: '主食33', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 84, goods: '货物描述9', type: 3, followers: 142, price: 34 },
    { id: 10, name: '食物11', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 12, good: '货物描述11', type: 1, followers: 325, price: 12 },
    { id: 11, name: '食物22', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 35, good: '货物描述12', type: 1, followers: 657, price: 435 },
    { id: 12, name: '食物33', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 63, good: '货物描述13', type: 1, followers: 924, price: 24 },
    { id: 13, name: '水果11', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 85, good: '货物描述14', type: 2, followers: 885, price: 546 },
    { id: 14, name: '水果22', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 14, good: '货物描述15', type: 2, followers: 708, price: 678 },
    { id: 15, name: '水果33', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 26, good: '货物描述16', type: 2, followers: 321, price: 345 },
    { id: 16, name: '主食11', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 37, good: '货物描述17', type: 3, followers: 362, price: 88 },
    { id: 17, name: '主食22', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 46, good: '货物描述18', type: 3, followers: 656, price: 98 },
    { id: 18, name: '主食33', discripition: '莫道不消愁，帘卷西风，人比黄花瘦', score: 85, good: '货物描述19', type: 3, followers: 132, price: 34 },
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
