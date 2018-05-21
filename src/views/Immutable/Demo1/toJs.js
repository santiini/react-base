/**
 * 高阶组件: 负责转化 immutable 数据为一般的数据
 */
import React from 'react';
import { Iterable } from 'immutable';

export const toJS = (WrappedComponent) => (wrappedComponentProps) => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.keys(wrappedComponentProps)
    .reduce((newProps, wrappedComponentProps) => {
      newProps[wrappedComponentProps[KEY]] = Iterable.isIterable(wrappedComponentProps[VALUE])
        ? wrappedComponentProps[VALUE].toJS()
        : wrappedComponentProps[VALUE]
      return newProps;
    }, {});
  // 返回组件;
  return <WrappedComponent {...propsJS} />
}


/**
 * tips: 参考链接:
 * 1. https://juejin.im/post/59bb829a6fb9a00a51437af8
 * 2. https://juejin.im/post/5948985ea0bb9f006bed7472
 * 3. https://juejin.im/post/5aefff6a518825672a02d7d8
 * 4. https://github.com/reduxjs/reselect
 * 5. https://segmentfault.com/a/1190000010676878
 * 6. https://juejin.im/post/5948985ea0bb9f006bed7472?utm_source=tuicool&utm_medium=referral
 * 7. http://cn.redux.js.org/docs/recipes/UsingImmutableJS.html
 * 8. https://facebook.github.io/immutable-js/docs/#/
 */