import React, { Component } from 'react';
import { Button } from 'antd'

class Resolve3 extends Component {

  showDialog = () => {
    // console.log(1111); 
    // const copyInput = document.createElement('input');
    // copyInput.value = '123456789';
    // copyInput.select();
    // document.execCommand('Copy');
    // console.log('复制');
    this.testBtn.click();
  }

  handleClick = () => {
    console.log('内部触发');
  }

  render() {
    return (
      <div>
        <h4>Resolve333 按需加载</h4>
        <Button onClick={this.showDialog}>外部按钮</Button>
        <div className="" style={{ display: 'none' }}>
          <div ref={(dom) => {this.testBtn = dom;}} onClick={this.handleClick}>内部按钮</div>
        </div>
      </div>
    )
  }
}
 
export default Resolve3;