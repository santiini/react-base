import React, { Component } from 'react';
import { Button } from 'antd';
// import axios from 'axios';

import { formatStr } from './test';
// import text from './input.js';

const str = '111222'
class Login extends Component {

  getRes = () => {
  }
  render() {
    console.log(formatStr(str));
    return (
      <div>
        <div>Login</div>
        <Button onClick={this.getRes}>测试</Button>
      </div>
    );
  }
}

export default Login;