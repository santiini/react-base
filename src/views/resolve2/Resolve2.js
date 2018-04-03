import React, { Component } from 'react';
import { Button } from 'antd'

class Resolve2 extends Component {

  showDialog = () => {
    console.log(1111);  
  }

  render() {
    return (
      <div>
        <h4>Resolve222 按需加载</h4>
        <Button onClick={this.showDialog}>加载resolve2222</Button>
      </div>
    )
  }
}
 
export default Resolve2;