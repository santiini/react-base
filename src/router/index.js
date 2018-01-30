/* 项目路由 */
import Demo1Component from '@/views/containers/demo1/Demo1';
import Demo2Component from '@/views/demo2/Demo2';
import Demo3Component from '@/views/containers/demo3/Demo3';
import Demo4Component from '@/views/demo4/Demo4';
import Demo5Component from '@/views/demo5/Demo5';

import NavComponent1 from '@/views/navComponent/Nav1';
import NavComponent2 from '@/views/navComponent/Nav2';
import NavComponent3 from '@/views/navComponent/Nav3';

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

export default routes;