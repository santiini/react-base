import React, { Component } from 'react';

const setHeader = (title) => (WrappedComponent) => class extends Component {
  render() {
    const props = this.props;
    return (
      <div>
        <h4>set title: {title}</h4>
        <WrappedComponent {...props} />
      </div>
    )
  }
}

export default setHeader;