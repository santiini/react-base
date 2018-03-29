import React, { Component } from 'react';
import { Button, Collapse } from 'antd';

const { Panel } = Collapse;

export default class Learn4 extends Component {
  test1 = () => {
    let a = 1
    if (true) {
        // console.log(a) // undefined: 'a' was used before it was defined
        let a = 2
        let b = 3
        console.log(b) // 3
        console.log(a) // 3
    }
    console.log(a) // 1
    // console.log(b) // b is not defined
    // b = 4  // b is not defined
  }

  render() {
    return (
      <div>
        <Collapse defaultActiveKey="1">
          <Panel header="111" key="1">
            <Button onClick={this.test1}>learn1</Button>
          </Panel>
          <Panel header="222" key="2">
            <Button onClick={this.test1}>learn2</Button>
          </Panel>
          <Panel header="33" key="3">
            <Button onClick={this.test1}>learn3</Button>
          </Panel>
        </Collapse>
      </div>
    )
  }
}