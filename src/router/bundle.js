/**
 * 形式二: Bundle 组件和 import() 实现的按需加载
 * 推荐
 */
import React, {Component} from 'react';

// Bundle 组件是一个异步加载组件进行渲染的组件;
export class Bundle extends Component {
  constructor(props) {
    super(props);
    this.state = {
        mod: null
    };
  }

  // 组件的渲染
  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  // 异步渲染函数
  load(props) {
    this.setState({
        mod: null
    });
    // 1. import() 函数实现, 有问题， OK！
    //注意这里，使用Promise对象; mod.default导出默认
    props.load().then((mod) => {
        this.setState({
            mod: mod.default ? mod.default : mod
        });
    });

    // 2. tips: bundle-loader 实现的按需加载: 可以成功;
    //   props.load((mod) => {
    //       this.setState({
    //           mod: mod.default ? mod.default : mod,
    //       })
    //   });
  }

  render() {
      return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

// 根据 path 来返回异步加载组件函数，实现异步加载
export const resolve = (loadFunc) => (props) => (
  <Bundle load={loadFunc}>
    { (Com) => <Com {...props} /> }
  </Bundle>
);

export default resolve;