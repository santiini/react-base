import React, { Component } from 'react'
import { Button, Card } from 'antd';
import MyButton from './demo5/Button'

export default class Demo5 extends Component {
  render() {
    return (
      <div className="">
        <Card title="测试组件">
          <div className="">
            <Button>2222</Button>
          </div>
          <div className="">
            <MyButton>
              <span>111111111</span>
            </MyButton>
          </div>
        </Card>
      </div>
    )
  };
}