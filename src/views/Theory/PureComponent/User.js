/**
 * bind(), 箭头函数 在 react 中引其 re-render 问题的解决方案;
 * 避免不必要的重复渲染;
 */
import React, { PureComponent } from 'react';

class User extends PureComponent {

  onDeleteUser = () => {
    const { user: { id }, onDeleteClick } = this.props;
    onDeleteClick(id);
  }

  render() {
    const { user: { name } } = this.props;
    console.log('User1 re-render');
    return (
      <li>
        <input
          type="button"
          value="Delete"
          onClick={this.onDeleteUser}
        />
        {name}
      </li>
    )
  }
}

export default User;