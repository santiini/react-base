import React, { Component } from 'react';
import { Button } from 'antd'

class Resolve3 extends Component {

  showDialog = () => {
    console.log(1111);  
  }

  render() {
    return (
      <div>
        <h4>Resolve333 按需加载</h4>
        <Button onClick={this.showDialog}>加载resolve333</Button>
      </div>
    )
  }
}
 
export default Resolve3;