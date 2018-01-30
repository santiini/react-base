# redux-thunk 的使用场景和方法

## 配置方法

在 createStore() 中，作为中间件使用，通过方法 applyMiddleare

```js
  // 在 store.js 中；
  import { createStore, applyMiddleware } from 'redux';
  import thunk from 'redux-thunk';

  // 创建 store;
  const store = createStore(
    reducers,
    // initialState,
    applyMiddleware(thunk),
  );

  export default store;

```

## 使用场景和方法

redux-thunk 用于改变 action 结构，可以改变返回值: object --> function:

```js

  // 1. 原来的 action, 返回 object: 同步 js，只负责传递和保存 data
  export const saveReducer = (data) => ({
    type: 'SAVE_REDUCER',
    data
  }) 

  // 2. 使用 redux-thunk 后，返回 function： 可以是异步过程, 获取并保存 data
  export const getPostDetail = (id) => (dispatch, getState) => {
    // 异步过程， 获取数据，然后通过 dispatch 保存
    getPost(id)
      .then((result) => {
        dispatch(saveReducer(result.data))
      })
      .catch(err => console.log(err))
  }

  // 3. 使用 async, await 重写方法2
  export const getPostDetail2 = (id) => async (dispatch, getState) => {
    try {
      const result = await getPost(id);
      await dispatch(result.data);
    } catch (err) {
      console.log(err)
    }
  }

```