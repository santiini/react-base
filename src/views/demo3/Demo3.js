import React, { Component } from 'react';

import TaskItem from './TaskItem'
import './demo3.styl';

export default class Demo3 extends Component {
  goBack = () => {
    console.log(11111)
    console.log(this.props) 
    // 从 react-router 获取的 props;
    this.props.history.push('/')
  }

  goDemo1 = () => {
    this.props.history.push({
      pathname: '/demo1',
      // 传递参数:
      state: {
        fromName: 'demo3',
      }
    })
  }

  handleAdd = (e) => {
    const val = e.target.value.trim()
    if (e.keyCode === 13) {
      this.props.actions.addTask({ name: val })
      this.input.value = ''
    }
  }

  handleSave = (id, text) => {
    this.props.actions.editTask({id, name: text})
  }

  handleDelete = (id) => {
    this.props.actions.deleteTask(id)
  }

  render() {
    const { taskList  } = this.props;
    // console.log(this.props)
    return (
      <div className="demo3">
        <h4>Demo3</h4>
        <div className="input-container">
          <input ref={node => this.input = node} type="text" onKeyDown={this.handleAdd} />
        </div>
        {taskList.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={this.handleDelete}
            saveTask={this.handleSave}
          />
        ))}
        <div className="footer-btn">
          <div className="back">
            <button onClick={this.goBack}>返回Home</button>
          </div>
          <div className="back">
            <button onClick={() => this.goDemo1()}>返回Demo1</button>
          </div>
        </div>
      </div>
    )
  }
}