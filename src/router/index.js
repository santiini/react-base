/* 项目路由 */
import Demo1Component from '@/views/containers/demo1/Demo1';
import Demo2Component from '@/views/demo2/Demo2';
import Demo3Component from '@/views/containers/demo3/Demo3';
import Demo4Component from '@/views/demo4/Demo4';
import Demo5Component from '@/views/demo5/Demo5';

// 按需加载
// import Demo6Component from '@/views/demo6/Demo6'; // import 指令组件后，按需加载就失效了;
import resolve from './resolve';
// import resolve from './bundle';

const getCom = (path) => () => import(`../views/${path}`);

const asyncCom = (component) => {
  const getCom = path => () => import(`../views/${path}`);
  return resolve(getCom(component));
};
const asyncComponent = (path) => resolve(getCom(path));

// import NavComponent1 from '@/views/navComponent/Nav1'; // 非按需加载
// const NavComponent1 = resolve(() => import(`${views}/navComponent/Nav1`)); // error
// const NavComponent2 = resolve(() => import('../views/navComponent/Nav1')); // OK
const NavComponent1 = resolve(getCom('navComponent/Nav1'));
const NavComponent2 = resolve(getCom('navComponent/Nav2'));
const NavComponent3 = resolve(getCom('navComponent/Nav3'));

// const Resolve1 = resolve(() => import('../views/demo6/Demo6'));
// const Resolve1 = resolve(getCom('demo6/Demo6'));
// const Resolve2 = resolve(getCom('Resolve2/Resolve2'));
// const Resolve3 = resolve(getCom('resolve3/Resolve3'));
const Resolve1 = asyncCom('demo6/Demo6');
const Resolve2 = asyncCom('Resolve2/Resolve2');
const Resolve3 = asyncCom('resolve3/Resolve3');

// 形式三： 利用异步加载函数 和 import() 函数实现的按需加载;
// const Resolve4 = resolve(getCom('Resolve1'));
// const Resolve5 = resolve(getCom('Resolve2'));
const  Resolve4 = asyncComponent('Resolve1');
const  Resolve5 = asyncComponent('Resolve2');

// 面试题的学习
const Learn1 = resolve(getCom('study/Learn1'));
const Learn2 = resolve(getCom('study/Learn2'));
const Learn3 = resolve(getCom('study/Learn3'));
const Learn4 = resolve(getCom('study/Learn4'));

// react-redux 测试
const ReduxDemo1 = resolve(getCom('redux/Demo1'));
const ReduxDemo2 = resolve(getCom('redux/Demo2'));
const ReduxDemo3 = resolve(getCom('redux/Demo3'));
const ReduxDemo4 = resolve(getCom('redux/Demo4'));
const ReduxDemo5 = resolve(getCom('redux/Demo5'));

// react-router
const RouteDemo1 = resolve(getCom('router/Match'));
const RouteDemo2 = resolve(getCom('router/History'));
const RouteDemo3 = resolve(getCom('router/Keep'));

// hoc
const HocDemo1 = resolve(getCom('Hoc/Demo1'));
const HocDemo2 = resolve(getCom('Hoc/Demo2'));

// antd
const AntdDemo1 = resolve(getCom('Antd/Demo1'));
const AntdDemo2 = resolve(getCom('Antd/Demo2'));
const AntdDemo3 = resolve(getCom('Antd/Demo3'));
const AntdDemo4 = resolve(getCom('Antd/Demo4'));

// react-router-redux
const RouterRedux1 = resolve(getCom('routerRedux/Demo1'));
const RouterRedux2 = resolve(getCom('routerRedux/Demo2'));

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
    ],
  },
  {
    name: 'react-router-redux',
    title: 'react-router-redux',
    children: [
      { path: '/routerRedux1', name: 'routerRedux1', title: 'routerRedux1', component: RouterRedux1},
      { path: '/routerRedux2', name: 'routerRedux2', title: 'routerRedux2', component: RouterRedux2},
    ],
  }
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