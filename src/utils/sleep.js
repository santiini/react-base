/**
 * async-await 实现 sleep 效果
 */

const sleep = (times) => new Promise((resolve, reject) => {
  setTimeout(resolve, times);
})

export default sleep;
