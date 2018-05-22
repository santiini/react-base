/* eslint-disable */
/* react 中 fetch 的封装使用 */
const commun_url = 'https://cnodejs.org/api/v1'; // 服务器地址
// let token = '';

function fetchRequest(url, options = {}) {
  const { method = 'GET', param = {} } = options;
  const header = {
    "Accept": 'application/json',
    "Content-Type": "application/json;charset=UTF-8",
    // "accesstoken":token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
  };

  // url 地址的判断
  if (url.indexOf('http') < 0) {
    url = `${commun_url}${url}`
  }

  console.log('request url:', url, options);  //打印请求参数
  if (method.toUpperCase() === 'GET') {
    // 请求参数的拼接
    const paramsArr = Object.keys(param).map((key) => `${key}=${param[key]}`);
    if (url.search(/\?/) !== -1) {
      url += '&' + paramsArr.join('&');
    } else {
      url += '?' + paramsArr.join('&');
    }
  }
  if (method.toUpperCase() === 'POST') {
    // post 请求参数转化
    options.body = JSON.stringify(options.param);
    Reflect.deleteProperty(options, 'param');
  }
  // options的重组
  options.header = Object.assign({}, header, options.header);

  // 1. 统一处理请求后，再返回
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.log('network error')
          /* tips: 小问题
           1. 这里使用 reject 会导致 Promise 状态变为 rejected，输出值为: { status: response.status },
             但是，代码并没有停止，还会继续执行，所以，下一个 then 还会执行， console.log()数据处理 then 会执行
           2. 使用 throw new Error() 则不会存在这个问题;
           */
          // console.log(response);
          // reject({ status: response.status });
          throw new Error(`${response.status}, ${response.statusText}`);
        }
      })
      .then((result) => {
        console.log('数据处理 then')
        if (result.success) {
          // resolve(result.data);
          resolve(result);
        } else {
          console.log('request error')
          reject(result);
        }
      })
      .catch((err) => {
        // 请求失败的 N 中原因
        console.log(err);
        reject({ type: 'error', status: -1, msg: '网络异常' });
      })
  })

  // 2. 直接返回 fetch 结果;
  // return fetch(url, options)
  //   .then(response => response.json())
}

export default fetchRequest;