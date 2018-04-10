# react-router 的嵌套传参

## 使用示例
```js
  //  父组件中:
  <Switch>
    <Route path={`${match.url}/demo1`} component={Content1} />
    <Route path={`${match.url}/demo2`} component={Content2} />
    <Route path={`${match.url}/:type`} component={Content3} />
  </Switch>
  // 子组件中: 注意两种使用方式获取的参数不同
  <Switch>
    <Route path={`${match.url}/sub1`} component={SubCom1} />
    <Route path={`${match.url}/sub2`} component={SubCom2} />
    {/* 1. 不采用 match.url, 可以在 match.params 中获取所有参数信息 */}
    <Route path="/router1/:type/:id" component={SubCom3} />
    {/* 2. 采用 match.url, 则 match.ul 固定为本页面，所以获取不到 :type 参数*/}
    {/* <Route path={`${match.url}/:id`} component={SubCom3} /> */}
  </Switch>

```

## 注意事项

1. 在非根组件中，也可以使用 Route 组件， 必须使用 Switch 组件配合
2. 带有参数的路由必须在最后，避免被匹配到
3. 父组件需要使用 exact，避免子组件匹配不到