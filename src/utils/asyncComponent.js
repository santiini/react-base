/**
 * 使用 react-loadable 异步加载组件
 */
import Loadable from 'react-loadable';
import React from 'react';
const noop = () => {};
// Loading 组件1
const Loading = (props) => {
  console.log(props);
  // Handle the loading state
  if (props.isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (props.error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};

// Loading 组件2： 优化 loading， 
/**
 * Loading 组件
 * @param {*} 
 * 1. error: 错误展示;
 * 2. timeOut: 超市显示
 * 3. retry: 超时重试
 * 4. 设置延迟: 在设置时间内一直 loading 
 */
const MyLoading = ({ error, isLoading, pastDelay, retry = noop, timedOut }) => {
  if (error) {
    console.log(error)
    return <div>Components Load Error!!! <button onClick={retry}>Retry</button></div>;
  } else if (timedOut) {
    console.log(timedOut);
    return <div>Taking a long time... <button onClick={retry}>Retry</button></div>;
  } else if (pastDelay) {
    console.log(pastDelay);
    return <div>Loading...</div>;
  } else {
    return null;
  }
};

// 获取组件的路径函数
const getAsyncCom = (filePath, loadingCom = Loading) => Loadable({
  // loading: Loading, // 存在一闪而过的闪屏现象;
  loading: MyLoading, // 不存在闪屏现象;
  loader: () => import(`../views/${filePath}`),
  // 有时组件加载很快（<200ms），loading 屏只在屏幕上一闪而过。
  // 一些用户研究已证实这会导致用户花更长的时间接受内容。如果不展示任何 loading 内容，用户会接受得更快, 所以有了delay参数。
  // delay?: number = 200， 默认200
  // timeout: 超时设置;
});

export default getAsyncCom;
