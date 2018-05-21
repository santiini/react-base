/**
 * bind(), 箭头函数正常使用导致的问题重现
 */
import React, { PureComponent } from 'react';

class User extends PureComponent {

  render() {
    const { onDeleteClick, name } = this.props;
    console.log(`User2 just rendered`);
    return (
      <li>
        <input
          type="button"
          value="Delete"
          onClick={onDeleteClick}
        />
        {name}
      </li>
    )
  }
}

export default User;