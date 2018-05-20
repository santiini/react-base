/**
 * react-loadable 的官方 Loading组件
 */
import React from 'react';

/**
 * Loading 组件
 * @param {*} 
 * 1. error: 错误展示;
 * 2. timeOut: 超市显示
 * 3. retry: 超时重试
 * 4. 设置延迟: 在设置时间内一直 loading 
 */
const Loading = ({ error, timeOut, retry, pastDelay }) => {
  console.log(error);
  console.log(timeOut);
  console.log(retry);
  console.log(pastDelay);
  if (error) {
    return <div>Error! <button onClick={retry}>Retry</button></div>;
  } else if (timeOut) {
    return <div>Taking a long time... <button onClick={retry}>Retry</button></div>;
  } else if (pastDelay) {
    return <div>Loading...</div>
  } else {
    return null;
  }
};

export default Loading;