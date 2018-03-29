// 1. hoc -- 属性代理
import React, { Component } from 'react';

const setTitle = (WrappedComponent) => class extends Component {
  componentDidMount() {
    console.log('hoc mounted');
  }

  render() {
    const props = {
      name: 'hoc1',
      ...this.props,
    };
    return (
      <WrappedComponent {...props} />
    );
  }
};

export default setTitle;