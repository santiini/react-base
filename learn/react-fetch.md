# react 中 fetch 的封装

## fetch 的基本用法

## fetch 的封装

## fetch 的常见问题

1. fetch兼容性

大多数情况下，实现fetch的polyfill需要涉及到的：

  + promise的polyfill，例如es6-promise、babel-polyfill提供的promise实现。

  + fetch的polyfill实现，例如isomorphic-fetch和whatwg-fetch

2. fetch默认不携带cookie

配置其credentials项，其有3个值：

  + omit: 默认值，忽略cookie的发送

  + same-origin: 表示cookie只能同域发送，不能跨域发送

  + include: cookie既可以同域发送，也可以跨域发送

这样，若要fetch请求携带cookie信息，只需设置一下credentials选项即可，例如fetch(url, {credentials: 'include'});

另外补充一点：

> fetch默认对服务端通过Set-Cookie头设置的cookie也会忽略，若想选择接受来自服务端的cookie信息，也必须要配置credentials选项；

3. fetch请求对某些错误http状态不会reject

这主要是由fetch返回promise导致的，因为fetch返回的promise在某些错误的http状态下如400、500等不会reject，相反它会被resolve；
只有网络错误会导致请求不能完成时，fetch 才会被 reject；所以一般会对fetch请求做一层封装，例如下面代码所示：

```js

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  function parseJSON(response) {
    return response.json();
  }
  export default function request(url, options) {
    let opt = options||{};
    return fetch(url, {credentials: 'include', ...opt})
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => ( data ))
      .catch((err) => ( err ));
  }

```

4. fetch不支持超时timeout处理

实现fetch的timeout功能，其思想就是新创建一个可以手动控制promise状态的实例，根据不同情况来对新promise实例进行resolve或者reject，从而达到实现timeout的功能；

根据github上timeout handling上的讨论，目前可以有两种不同的解决方法：

+ 方法一：单纯setTimeout方式

```js

  var oldFetchfn = fetch; //拦截原始的fetch方法
  window.fetch = function(input, opts){//定义新的fetch方法，封装原有的fetch方法
      return new Promise(function(resolve, reject){
          var timeoutId = setTimeout(function(){
              reject(new Error("fetch timeout"))
          }, opts.timeout);
          oldFetchfn(input, opts).then(
              res=>{
                  clearTimeout(timeoutId);
                  resolve(res)
              },
              err=>{
                  clearTimeout(timeoutId);
                  reject(err)
              }
          )
      })
  }

```

当然在上面基础上可以模拟类似XHR的abort功能：


```js

  var oldFetchfn = fetch; 
  window.fetch = function(input, opts){
      return new Promise(function(resolve, reject){
          var abort_promise = function(){
              reject(new Error("fetch abort"))
          };
          var p = oldFetchfn(input, opts).then(resolve, reject);
          p.abort = abort_promise;
          return p;
      })
  }

```


+ 方法二：利用Promise.race方法

Promise.race方法接受一个promise实例数组参数，表示多个promise实例中任何一个最先改变状态，那么race方法返回的promise实例状态就跟着改变，具体可以参考这里。

```js

  var oldFetchfn = fetch; //拦截原始的fetch方法
  window.fetch = function(input, opts){//定义新的fetch方法，封装原有的fetch方法
      var fetchPromise = oldFetchfn(input, opts);
      var timeoutPromise = new Promise(function(resolve, reject){
          setTimeout(()=>{
              reject(new Error("fetch timeout"))
          }, opts.timeout)
      });
      retrun Promise.race([fetchPromise, timeoutPromise])
  }

```

最后，对fetch的timeout的上述实现方式补充几点：

> timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间；

> fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已；


### fetch不支持JSONP

### fetch不支持progress事件

### fetch跨域问题