# Immutable.js 的学习

Immutable 很适合在 redux 中使用，但在使用时要注意使用方法;

核心:
Immutable 数据是不可变数据，对数据进行 Immutable 操作后，返回的是新的数据，旧的数据结构保持不变，为可逆性做好了准备;

## Immutable-redux 中 Immutable 数据的使用场所

使用时注意一下几点实践:

### JS 对象的转换为 Immutable 对象;

1. 不要在Immutable对象中混用原生JavaScript对象；

2. 当在Immutable对象内添加JavaScript对象时, 先使用 fromJS() 把 JS 数据转为 Immutable 数据;
  这往往发生在: 1. 从 api 接口获取数据时; 2. 插入新的数据时;

### Immutable 和 redux state

1. 使用 Immutable对象 表示完整的 Redux 状态树；

  对于一个Redux应用，完整的状态树应该由一个Immutable对象表示，而没有原生JavaScript对象。

2. 使用fromJS()方法创建状态树:

  状态树对象可以是一个Immutable.Record或者任何其他的实现了get,set,withMutations方法的Immutable集合的实例。

3. 使用redux-immutable库调整combineReducers方法使其能处理Immutable。

### Immutable 和 Redux 组件

通过 connect 连接组件和 redux 时，注意： 不要在 mapStateToProps 中使用 toJS(), 这会导致 props 指向在 re-render 时改变;

1. 除了在展示型组件内，其他地方一律使用Immutable方式操作状态对象；

为了保证应用性能，在容器组件，选择器（selectors），reducer函数，action创建函数，sagas和thunks函数内等所有地方均使用Immutable，但是不在展示型组件内使用。

2. 在容器组件内使用 Immutable

容器组件可以使用react-redux提供的connect方法访问redux的store，所以我们需要保证选择器（selectors）总是返回Immutable对象，否则，将会导致不必要的重新渲染。另外，我们可以使用诸如reselect的第三方库缓存选择器（selectors）以提高部分情景下的性能。

### Immutable对象转换为JavaScript对象

toJS() 方法会导致大量的性能消耗，使用时需要谨慎:

1. 绝对不要在mapStateToProps方法内使用toJS()方法

在mapStateToProps方法内使用toJS()方法，则每次状态树（Immutable对象）变更时，无论该toJS()方法返回的JavaScript对象是否实际发生改变，组件都会认为该对象发生变更，从而导致不必要的重新渲染。

2. 绝对不要在展示型组件内使用toJS()方法

如果传递给某组件一个Immuatble对象类型的prop，则该组件的渲染取决于该Immutable对象，这将给组件的重用，测试和重构带来更多困难

3. 在容器型组件中，从 redux 中获取 state 时，推荐使用 Hoc

```js

// 在 toJS.js, 高阶组件: 负责转化 immutable 数据为 JS 的数据
import React from 'react';
import { Iterable } from 'immutable';

const toJS = (WrappedComponent) => (wrappedComponentProps) => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps)
    .reduce((newProps, wrappedComponentProps) => {
      newProps[wrappedComponentProps[KEY]] = Iterable.isIterable(wrappedComponentProps[VALUE])
        ? wrappedComponentProps[VALUE].toJS()
        : wrappedComponentProps[VALUE]
      return newProps;
    }, {});
  // 返回组件;
  return <WrappedComponent {...propsJS} />
}

export default toJS;


// 在容器型组件中，使用 toJS()

import { connect } from 'react-redux'
import { toJS } from './to-js'
import DumbComponent from './dumb.component'

const mapStateToProps = state => {
  // 这里的 obj 仍然是 Immutable 数据;
  obj: getImmutableObjectFromStateTree(state),
};

export default connect(mapStateToProps)(toJS(DumbComponent));

```
