/**
 * Immutable 中的 Post 的 action
 */
import { Request, Success, Failure } from '../pureAction';
import sleep from '@/utils/sleep';

const resource = 'POST';

// 获取任务: 通过 pureAction 拆分，实现 loading 加载中的判断;
export function fetch(params) {
  return async (dispatch, getState) => {
    dispatch(Request(resource, 'fetch'));
    try {
      const list = [
        { id: 21, name: '第11项' },
        { id: 22, name: '第12项' },
        { id: 23, name: '第13项' },
        { id: 24, name: '第14项' },
        { id: 25, name: '第15项' },
        { id: 26, name: '第16项' },
        { id: 27, name: '第17项' },
        { id: 28, name: '第18项' },
        { id: 29, name: '第19项' },
        { id: 30, name: '第20项' },
      ];
      await sleep(3000);
      dispatch(Success({ data: list }, resource, 'fetch'));
    } catch (err) {
      dispatch(Failure(err, resource, 'fetch'));
      console.log(err);
    }
  }
}

// 根据 id 删除 Post
export const deletePost = (id) => async (dispatch, getStae) => {
  dispatch(Request(resource, 'delete'));
  try {
    await sleep(3000);
    dispatch(Success({ id }, resource, 'delete'));
  } catch (err) {
    dispatch(Failure({ error: err }, resource, 'delete'));
    console.log(err);
  }
}

// 更新 id 内容
export const updateOne = (id, post) => async (dispatch, getState) => {
  dispatch(Request(resource, 'update'));
  try {
    await sleep(3000);
    dispatch(Success({ id, post }, resource, 'update'));
  } catch (err) {
    console.log(err);
    dispatch(Failure({ error: err }, resource, 'update'));
  }
}
