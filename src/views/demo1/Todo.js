// 函数式组件
import React from 'react';
import PropTypes from 'prop-types';

import deleteImg from '../../assets/img/delete.png';
import checkedImg from '../../assets/img/sq-checked.png';
import unCheckedImg from '../../assets/img/unchecked.png';

const Todo = ({item, handleDelete, changeStatus}) => {
  const { text, completed, id } = item;
  return (
    <li>
      <div className="todo-item">
        <div className="todo-status" onClick={() => changeStatus(id)}>
          <img height="28" src={completed ? checkedImg : unCheckedImg} alt="checked"/>
        </div>
        <div className="todo-content">{text}</div>
        {/* <div className="todo-delete" onClick={() => handleDelete(text)}>删除</div> */}
        <img className="delete-icon" src={deleteImg} onClick={() => handleDelete(text)} alt="删除" height="24" />
      </div>
    </li>
  )
}

// 使用 prop-types 库验证 props;
Todo.propTypes = {
  item: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};

export default Todo;
