# webpack 中 plugins 的使用

webpack 的 plugins 插件功能十分强大;

## webpack.ProvidePlugin 使用全局变量

```js
  // plugins
  plugins: [
    // ...
    new webpack.ProvidePlugin({
      // 全局使用 lodash, 去 lodash 模块搜索变量 _
      _: 'lodash',
    })
  ],

```
