# 后台开发的注意点

## 后台开发获取 cookie

每次开发时，用对应账号登录后台管理系统，获取后台 cookies 后，作为前端开发的参数;

1. 用开发账号登录后台系统

2. 从浏览器中获取当前用户的 cookies 信息

3. 把获取的 cookie 作为当前用户的 cookies 使用

```js
  // 在 axios.js 文件中，修改参数为获取的 cookies
  setToken('18A3E83796A5257A6EA4AB0156565BD2'); // 开发环境的测试

```