import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Button } from 'antd';

import Loading from './Loading';

// 1.  正常引入组件，不会按需加载;
// import Comp1 from './Comp1';
// import Comp2 from './Comp2';

// 2. 使用 react-loadable, 实现按需加载组件
const Comp1 = Loadable({
  loader: () => import('./Comp1'),
  loading: Loading,
  delay: 5000000,
});
const Comp2 = Loadable({
  loader: () => import('./Comp2'),
  loading: Loading,
  delay: 40000000,
  timeout: 10000000,
});

class LoadableCom extends Component {
  state = {
    name: '按需加载',
    isVisible: false,
  }

  getCom1 = () => {
    this.setState({ isVisible: true });
  }

  onMouseOver = () => {
    console.log(1111111);
    // Comp2.preload();
  };

  render() {
    const { isVisible } = this.state;
    return (
      <div className="">
        <h4>react 的按需加载库: react-loadable</h4>
        <Comp2 />
        <Button
          onClick={this.getCom1}
          onMouseOver={this.onMouseOver}
        >开始加载Com1</Button>
        <button
          onClick={this.getCom1}
          onMouseOver={this.onMouseOver}
        >
          开始加载Com2
        </button>
        {
          isVisible &&
          <div className="">
            <Comp1 />
          </div>
        }
        {
          isVisible &&
          <div className="">
            <Comp2 />
          </div>
        }
      </div>
    )
  }
}

export default LoadableCom;
