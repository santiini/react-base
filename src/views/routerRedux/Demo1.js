import React, { Component } from 'react';
import { Button } from 'antd'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect(
  state => state,
)
class Demo1 extends Component {

  showDialog = () => {
    console.log('跳转')
    this.props.dispatch(push('/routerRedux2'))
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h4>react-redux 1</h4>
        <Button onClick={this.showDialog}>Demo1</Button>
      </div>
    )
  }
}
 
export default Demo1;