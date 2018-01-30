import React, { Component } from 'react';

const setHeader = (WrappedComponent) => class extends Component {
  render() {
    const props = this.props;
    return (
      <div>
        <h4>set header</h4>
        <WrappedComponent {...props} />
      </div>
    )
  }
}

export default setHeader;