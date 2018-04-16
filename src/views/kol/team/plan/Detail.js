import React, { Component } from 'react';

class Detail extends Component {
  render() {
    console.log(this.props.match);
    return (
      <div>
        <div>plan detail</div>
      </div>
    );
  }
}

export default Detail;