import React, { Component } from 'react';
import { Button } from 'antd'

class Demo6 extends Component {

  showDialog = () => {
    console.log(1111);  
  }

  render() {
    return (
      <div>
        <h4>Resolve1 按需加载</h4>
        <Button onClick={this.showDialog}>加载resolve1</Button>
      </div>
    )
  }
}
 
export default Demo6;