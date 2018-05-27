/**
 * immutable.js action的改进
 */
import { Succeed, Fail, Request } from '../utils';
import sleep from '@/utils/sleep';

// 当前模块
const resource = 'SHOPPING';
// 固定请求状态
const requesAction = Request(resource);
// 成功、失败返回函数，接受参数: 1. data/error, 2. operate
const failureAction = Fail(resource);
const succeedAction = Succeed(resource);

// fetch
export function fetch(params) {
  return async (dispatch, getState) => {
    dispatch(requesAction);
    try {
      const list = [
        { id: 11, name: '食物444', type: 1, followers: 142, price: 34 },
        { id: 12, name: '食物555', type: 1, followers: 442, price: 23 },
        { id: 13, name: '食物666', type: 1, followers: 753, price: 645 },
        { id: 14, name: '水果444', type: 2, followers: 286, price: 43 },
        { id: 15, name: '水果555', type: 2, followers: 685, price: 78 },
        { id: 16, name: '水果666', type: 2, followers: 521, price: 73 },
        { id: 17, name: '主食444', type: 3, followers: 942, price: 85 },
        { id: 18, name: '主食555', type: 3, followers: 566, price: 534 },
        { id: 19, name: '主食666', type: 3, followers: 386, price: 92},
        { id: 20, name: '零食444', type: 4, followers: 163, price: 38 },
        { id: 21, name: '零食555', type: 4, followers: 692, price: 53 },
        { id: 22, name: '零食666', type: 4, followers: 728, price: 86 },
      ];
      await sleep(3000);
      dispatch(succeedAction({ list }, 'fetch'));
    } catch (err) {
      console.log(err);
      dispatch(failureAction(err));
    }
  }
}
