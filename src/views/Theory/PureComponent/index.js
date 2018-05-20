import React, { Component } from 'react';
import { Card } from 'antd';

import PureDemo2 from './PureCom1';

class PureCom extends Component {
  render() {
    return (
      <div className="">
        <Card title="PureComponent学习">
          <h4>学习</h4>
          <PureDemo2 />
        </Card>
      </div>
    )
  }
}

export default PureCom;