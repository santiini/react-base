# react-redux 的使用进阶

## react-redux 的基本使用

在 react 中使用 redux 时，需要安装以下 redux 的库:

```bash

  npm install redux --save
  npm install react-redux --save

```

在 demo1 中，基于 react-redux 实现的 todos，react 和 redux 的交互如下:

1. redux 中, 对应 action-types 生成 actions 函数 和 reducer 函数

```js
  // actions.js
  export function toggleTodo(id) {
    return {
      type: actions.TOGGLE_TODO,
      id,
    }
  }

  // reducers.js
  function filterType(state = initialState.filterType, action) {
    switch (action.type) {
      case SET_FILTER:
        return action.filter;
      default:
        return state;
    }
  }

```

2. 在 containers 中，通过 connect(mapStateToProps, mapDispatchToProps)(Component) 连接组件和 state:

    1. 其中 mapStateToProps 映射 store.state 到组件 props;

    2. mapDispatchToProps 定义组件方法，通过 dispatch 参数调用 actions 函数;

```js
  import { connect } from 'react-redux';

  import Link from '@/views/demo1/Link';
  import { setFilter } from '@/redux/actions';

  const mapStateToProps = (state, ownProps) => ({
    active: state.filterType === ownProps.filter,
  });

  // 1. mapDispatchToProps 的函数形式
  const mapDispatchToProps = (dispatch, ownProps) => ({
    handleLink: () => {
      // console.log(ownProps.filter)
      dispatch(setFilter(ownProps.filter));
    },
  });

  // 2. mapDispatchToProps 的对象形式
  // const mapDispatchToProps = {
  //   handleLink: setFilter
  // }

  export default connect(mapStateToProps, mapDispatchToProps)(Link);

```

3. 在组件中，通过 props 中获取 store.state, 调用 actions;

```js

  toggleTodo = (id) => {
    this.props.toggleTodo(id);
  }

```

## react-redux 的进阶使用

以 Hoc 的形式使用 react-redux 的 connect 方法;

### Hoc 以 es7 的 decorator 的形式使用，安装依赖库

1. 安装 babel-plugin-transform-decorators-legacy

```bash

  npm install babel-plugin-transform-decorators-legacy -D

```

2. 修改 babel 配置， 添加 plugins: transform-decorators-legacy, 具体做法：

在 node_modules/babel-preset-react-app/index.js plugins 中，修改:

```js

const plugins = [
  // 修饰器： decorator
  require.resolve('babel-plugin-transform-decorators-legacy'),
  // Necessary to include regardless of the environment because
  // in practice some other transforms (such as object-rest-spread)
  // don't work without it: https://github.com/babel/babel/issues/7215
  require.resolve('babel-plugin-transform-es2015-destructuring'),
  // class { handleClick = () => { } }
  require.resolve('babel-plugin-transform-class-properties'),
  // ....

```

### 组件中的使用方法

connect 方法可以作为高阶组件使用，更加方便;

```js
  // 形式一: 生命 mapDispatchToProps: dispatch => ({})  或者 { }
  @connect(
    state => ({ userInfo: state.userInfo }),
    // 1. 函数形式的 mapDispatchToProps;
    dispatch => bindActionCreators({ updateUser }, dispatch),
    // 2. 对象形式的 mapDispatchToProps；
    // { updateUser },
  )
  class Demo4 extends Component {
    changeAge = (e) => {
      this.props.updateUser({ age: 11 })
    }
  }

  // 形式二: 直接传递 dispatch 给子组件

  @connect(
    // conenct 中不生命 mapDispatchToProps
    state => ({ userInfo: state.userInfo }),
  )
  class Demo4 extends Component {
    // 子组件中，获取 dispatch 并派发事件 actions;
    componentWillUnmount() {
      const { dispatch } = this.props;
      dispatch({
        type: 'chart/clear',
      });
    }
  }

```

#### 使用

## react-redux 在 dva 中的使用