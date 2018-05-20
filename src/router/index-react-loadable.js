/* 项目路由 */
// 使用 react-loadable 库进行按需加
import Loadable from 'react-loadable';
import React from 'react';

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
const MyLoading = ({ error, isLoading, pastDelay, retry, timedOut }) => {
  if (error) {
    return <div>Error! <button onClick={retry}>Retry</button></div>;
  } else if (timedOut) {
    return <div>Taking a long time... <button onClick={retry}>Retry</button></div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
};

// 获取组件的路径函数
const getAsyncCom = (filePath, loadingCom = Loading) => Loadable({
  loading: Loading,
  // loading: MyLoading,
  loader: () => import(`../views/${filePath}`),
  // 有时组件加载很快（<200ms），loading 屏只在屏幕上一闪而过。
  // 一些用户研究已证实这会导致用户花更长的时间接受内容。如果不展示任何 loading 内容，用户会接受得更快, 所以有了delay参数。
  // delay?: number = 200， 默认200
});

// const Demo1Component = Loadable({
//   loading: Loading,
//   loader: () => import(getComPath('containers/demo1/Demo1')),
// });
// demos 简单测试
const Demo1Component = getAsyncCom('containers/demo1/Demo1');
const Demo2Component = getAsyncCom('demo2/Demo2');
const Demo3Component = getAsyncCom('containers/demo3/Demo3');
const Demo4Component = getAsyncCom('demo4/Demo4');
const Demo5Component = getAsyncCom('demo5/Demo5');

// Nav 导航组件
const NavComponent1 = getAsyncCom('navComponent/Nav1');
const NavComponent2 = getAsyncCom('navComponent/Nav2');
const NavComponent3 = getAsyncCom('navComponent/Nav3');

// resolve 测试
const Resolve1 = getAsyncCom('demo6/Demo6');
const Resolve2 = getAsyncCom('Resolve2/Resolve2');
const Resolve3 = getAsyncCom('resolve3/Resolve3');

// 形式三： 利用异步加载函数 和 import() 函数实现的按需加载;
const Resolve4 = getAsyncCom('Resolve1');
const Resolve5 = getAsyncCom('Resolve2');

// 面试题的学习
const Learn1 = getAsyncCom('study/Learn1');
const Learn2 = getAsyncCom('study/Learn2');
const Learn3 = getAsyncCom('study/Learn3');
const Learn4 = getAsyncCom('study/Learn4');

// react-redux 测试
const ReduxDemo1 = getAsyncCom('redux/Demo1');
const ReduxDemo2 = getAsyncCom('redux/Demo2');
const ReduxDemo3 = getAsyncCom('redux/Demo3');
const ReduxDemo4 = getAsyncCom('redux/Demo4');
const ReduxDemo5 = getAsyncCom('redux/Demo5');

// react-router
const RouteDemo1 = getAsyncCom('router/Match');
const RouteDemo2 = getAsyncCom('router/History');
const RouteDemo3 = getAsyncCom('router/Keep');

// hoc
const HocDemo1 = getAsyncCom('Hoc/Demo1');
const HocDemo2 = getAsyncCom('Hoc/Demo2');

// props 参数传递
const PropsComponent = getAsyncCom('passProps/props');

// antd
const AntdDemo1 = getAsyncCom('Antd/Demo1');
const AntdDemo2 = getAsyncCom('Antd/Demo2');
const AntdDemo3 = getAsyncCom('Antd/Demo3');
const AntdDemo4 = getAsyncCom('Antd/Demo4');
const AntdDemo5 = getAsyncCom('Antd/Demo5');

// kol
const KolCom = getAsyncCom('kol/index');
const KolCom2 = getAsyncCom('kol/Demo2');
const KolCom3 = getAsyncCom('kol/Demo3');

// test
// const TestCom = resolve(getCom('test/Demo1'));
const LookComponent = getAsyncCom('Look/ReceiveProps');

// lodash
const LodashMap = getAsyncCom('Lodash/Map');

// 功能
const CopyComponent = getAsyncCom('try/Copy');

// 第三方库
const LoadableCom = getAsyncCom('ReactLibrary/ReactLoadable'); // react-loadable 按需加载

// react-router-redux
const RouterRedux2 = getAsyncCom('routerRedux/Demo2');
const RouterRedux1 = getAsyncCom('navComponent/Nav1');

// 处理左侧菜单栏的函数
const getPath = (arr) => arr.reduce((prev, cur) => {
  if (cur.path) {
    prev.push(cur);
    return prev;
  }
  if (cur.children) {
    return [
      ...prev,
      ...cur.children,
    ]
  }
  return prev;
}, []);

export const sideMenus = [
  {
    name: 'demos',
    title: 'demos',
    children: [
      {
        path: '/demo1',
        name: 'demo1',
        title: 'demo1',
        component: Demo1Component,
      },
      {
        path: '/demo2',
        name: 'demo2',
        title: 'demo2',
        component: Demo2Component,
      },
      {
        path: '/demo3',
        name: 'demo3',
        title: 'demo3',
        component: Demo3Component,
      },
      {
        path: '/demo4',
        name: 'demo4',
        title: 'demo4',
        component: Demo4Component,
      },
      {
        path: '/demo5',
        name: 'demo5',
        title: 'demo5',
        component: Demo5Component,
      },
    ]
  },
  {
    name: 'ensure',
    title: '按需加载',
    children: [
      {
        path: '/resolve1',
        name: 'resolve1',
        title: 'resolve1',
        component: Resolve1,
      },
      {
        path: '/resolve2',
        name: 'resolve2',
        title: 'resolve2',
        component: Resolve2,
      },
      {
        path: '/resolve3',
        name: 'resolve3',
        title: 'resolve3',
        component: Resolve3,
      },
      {
        path: '/resolve4',
        name: 'resolve4',
        title: 'resolve4',
        component: Resolve4,
      },
      {
        path: '/resolve5',
        name: 'resolve5',
        title: 'resolve5',
        component: Resolve5,
      },
    ]
  },
  {
    name: 'study',
    title: '面试题学习',
    children: [
      {
        path: '/learn1',
        name: 'learn1',
        title: 'prototype',
        component: Learn1,
      },
      {
        path: '/learn2',
        name: 'learn2',
        title: 'es6的Class继承',
        component: Learn2,
      },
      {
        path: '/learn3',
        name: 'learn3',
        title: 'CSS',
        component: Learn3,
      },
      {
        path: '/learn4',
        name: 'learn4',
        title: 'JS',
        component: Learn4,
      },
    ],
  },
  {
    name: 'redux',
    title: 'react-redux',
    children: [
      {
        path: '/redux1',
        name: 'redux1',
        title: 'redux1',
        component: ReduxDemo1,
      },
      {
        path: '/redux2',
        name: 'redux2',
        title: 'redux2',
        component: ReduxDemo2,
      },
      {
        path: '/redux3',
        name: 'redux3',
        title: 'redux3',
        component: ReduxDemo3,
      },
      {
        path: '/redux4',
        name: 'redux4',
        title: 'redux4',
        component: ReduxDemo4,
      },
      {
        path: '/redux5',
        name: 'redux5',
        title: 'redux5',
        component: ReduxDemo5,
      },
    ],
  }, {
    name: 'router',
    title: 'react-router',
    children: [
      {
        path: '/router1',
        name: 'router1',
        title: 'router1',
        component: RouteDemo1,
      },
      {
        path: '/router2',
        name: 'router2',
        title: 'router2',
        component: RouteDemo2,
      },
      {
        path: '/router3',
        name: 'router3',
        title: 'router3',
        component: RouteDemo3,
      },
    ],
  },
  {
    name: 'hoc',
    title: 'hoc',
    children: [
      { path: '/hoc1', name: 'hoc1', title: 'hoc1', component: HocDemo1 },
      { path: '/hoc2', name: 'hoc2', title: 'hoc2', component: HocDemo2 },
    ],
  },
  {
    name: 'antd',
    title: 'antd',
    children: [
      { path: '/antd1', name: 'antd1', title: 'hoc1', component: AntdDemo1 },
      { path: '/antd2', name: 'antd2', title: 'hoc2', component: AntdDemo2 },
      { path: '/antd3', name: 'antd3', title: 'hoc3', component: AntdDemo3 },
      { path: '/antd4', name: 'antd4', title: 'hoc4', component: AntdDemo4 },
      { path: '/antd5', name: 'antd5', title: 'react学习', component: AntdDemo5 },
    ],
  },
  {
    name: 'kol',
    title: 'social',
    children: [
      { path: '/kol/app', name: 'app', title: 'app', component: KolCom },
      { path: '/kol/app2', name: 'app2', title: 'app2', component: KolCom2 },
      { path: '/kol/app3', name: 'app3', title: 'app3', component: KolCom3 },
    ]
  },
  // {
  //   name: 'test',
  //   title: 'test',
  //   children: [
  //     { path: '/test1', name: 'test1', title: 'test1', component: TestCom }
  //   ],
  // },
  {
    name: 'look',
    title: '生命周期',
    children: [
      { path: '/react/receiveProps', name: 'reveiveProps', title: 'reveiveProps', component: LookComponent },
    ],
  },
  {
    name: 'props',
    title: '参数和属性传递',
    children: [
      { path: '/props/state', name: 'passProps', title: 'props', component: PropsComponent }
    ],
  },
  {
    name: 'lodash',
    title: 'lodash',
    children: [
      { path: '/lodash/map', name: 'map', title: 'lodash-map', component: LodashMap }
    ],
  },
  {
    name: 'try',
    title: '功能测试',
    children: [
      { path: '/try/copuy', name: 'copy', title: '复制', component: CopyComponent },
    ]
  },
  {
    name: 'library',
    title: '第三方库',
    children: [
      { path: '/lib/loadable', name: 'loadable', title: 'react-loadable', component: LoadableCom },
    ]
  },
  {
    name: 'react-router-redux',
    title: 'react-router-redux',
    children: [
      { path: '/routerRedux1', name: 'routerRedux1', title: 'routerRedux1', component: RouterRedux1 },
      { path: '/routerRedux2', name: 'routerRedux2', title: 'routerRedux2', component: RouterRedux2 },
    ],
  },
];

export const topMenus = [
  {
    path: '/nav1',
    name: 'nav1',
    component: NavComponent1,
  },
  {
    path: '/nav2',
    name: 'nav2',
    component: NavComponent2,
  },
  {
    path: '/nav3',
    name: 'nav3',
    component: NavComponent3,
  },
];

const routes = [
  ...getPath(sideMenus),
  ...topMenus,
];

export const getRouteData = () => {
  let routeData = {};

  routes.forEach((route) => {
    routeData[route.name] = route;
  });

  return routeData;
}

export default routes;