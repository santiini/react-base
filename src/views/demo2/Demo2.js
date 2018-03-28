import React, { Component } from 'react';

import './demo2.styl';

// this.props.children 的使用;
// tips: 相当于 vueJS 中的 slot;
const Com1 = ({name, age, children}) => {
  // console.log(children)
  return (
    <div>
      <div className="">name: {name}</div>
      <div className="">age: {age}</div>
      {children}
    </div>
  );
}

export default class Demo2 extends Component {
  render() {
    return (
      <div className="demo2">
        <h4 className="demo2-title">Demo2: stylus, autoprefixer 的支持</h4>
        <Com1 name={'sunxt'} age={28}>
          <div className="demo2-info">else: else 信息</div>
        </Com1>
        <div style={{position: 'relative'}}>
          <span className="transform-text">11111</span>
        </div>
      </div>
    )
  }
}