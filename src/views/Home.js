import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {

  static contextTypes = {
    routeData: PropTypes.object,
  }

  componentDidMount() {
    console.log(this.props)
    console.log(this.context)
  }
  render() {
    return (
      <div>
        <h4>Home</h4>
      </div>
    )
  }
}