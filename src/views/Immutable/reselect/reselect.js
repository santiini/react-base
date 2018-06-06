/**
 * 作为主页
 * 
 */

import React, { PureComponent } from 'react';

// import { Card, Button } from 'antd';
import ReselectDemo from './selector';

class Container extends PureComponent {
  render() {
    return (
      <div className="container">
        <h4>router-container</h4>
        <ReselectDemo
          title="immutable-reselect测试"
          length={5}
        />
      </div>
    )
  }
}

export default Container;
