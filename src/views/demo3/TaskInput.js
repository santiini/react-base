import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskInput extends Component {
  static propTypes = {
    val: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  state = {
    text: this.props.val || '',
  }

  handleOnchange = (e) => {
    // console.log(e.target.value)
    this.setState({ text: e.target.value })
  }

  handleSubmit = (e) => {
    const text = e.target.value.trim()
    if (e.keyCode === 13) {
      this.props.onSave(text);
      this.setState({ text: '' })
    }
  }

  render() {
    return (
      <input
        className="task-input"
        value={this.state.text}
        onChange={this.handleOnchange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}
