import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateUser } from '@/redux/actions';

import './demo4.css';

// Hoc 的使用;
// import setHeader from '@/hoc/setHeader';
// import setTitle from '@/hoc/setTitle';

// connect 作为 Hoc 的方法使用:
// @connect(
//   state => {
//     console.log(state);
//     return ({ name: state.name })
//   }
// )
@connect(
  state => ({ userInfo: state.userInfo }),
  // 1. 函数形式的 mapDispatchToProps;
  dispatch => bindActionCreators({ updateUser }, dispatch),
  // 2. 对象形式的 mapDispatchToProps；
  // { updateUser },
)
class Demo4 extends Component {

  changeName = (e) => {
    console.log(this.props)
    // tips: 如果 connect 中 生命了 dispatch 的 mapDispatchToProps, 则组件中就无法获取到 dispatch;
    // 在组件中使用 dispatch:
    // 可以直接 dispatch({ type }), 无需引用，直接派发 action;
    // this.props.dispatch({
    //   type: 'updateUser',
    //   info: { name: '小白' },
    // })
  }

  changeAge = (e) => {
    this.props.updateUser({ age: 11 })
  }

  render() {
    const { userInfo: { name = '无', age = 18 } } = this.props;
    // console.log(this.props);
    return (
      <div className="demo4">
        <h4>demo4: react-redux: connect的使用进阶</h4>
        <div className="">name: { name }</div>
        <div className="">age: { age }</div>
        <div className="" style={{padding: '10px'}}>
          <button onClick={this.changeName}>Change Name</button>
        </div>
        <div className="" style={{padding: '10px'}}>
          <button onClick={this.changeAge}>Change Age</button>
        </div>
      </div>
    );
  }
}

export default Demo4;