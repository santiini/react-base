import React, { Component } from 'react';
import { Button } from 'antd'
import { connect } from 'react-redux';

@connect(
  state => state,
)
class Demo2 extends Component {

  showDialog = () => {
    console.log(1111);  
  }

  render() {
    return (
      <div>
        <h4>react-redux 22</h4>
        <Button onClick={this.showDialog}>Demo2</Button>
      </div>
    )
  }
}
 
export default Demo2;