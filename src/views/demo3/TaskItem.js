import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import format from '@/utils/time-format';
import TaskInput from './TaskInput';
import deleteImg from '../../assets/img/delete.png';
// import checkedImg from '../../assets/img/sq-checked.png';
import unCheckedImg from '../../assets/img/unchecked.png';

export default class TaskItem extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
  }

  handleSave = (id, name) => {
    this.setState({
      editing: false,
    })
    this.props.saveTask(id, name)
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  render() {
    let element
    const { task: { id, name }, deleteTask } = this.props;

    if (this.state.editing) {
      element = (<TaskInput val={name} onSave={(text) => this.handleSave(id, text)} />);
    } else {
      element = (
        <div className="task-item-info" onDoubleClick={this.handleDoubleClick}>
          <div className="item-icon">
            <img src={unCheckedImg} alt="icon" height="24" />
          </div>
          <div className="item-title">{name}</div>
          <div className="item-delete" onClick={() => deleteTask(id)}>
            <img src={deleteImg} alt="删除" height="24" />
          </div>
        </div>
      );
    }

    // 统一返回形似;
    return (
      <div className="task-item">
        {element}
      </div>
    )
  }
}