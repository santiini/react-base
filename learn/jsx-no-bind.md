# jsx 中的 jsx-no-bind

## 比较一下几个例子:

1. 例子1：
```js
// 
import React from 'react';
import { render } from 'react-dom';
import User from './User';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: 'Cory' }, 
        { id: 2, name: 'Meg' }, 
        { id: 3, name: 'Bob' }
      ]
    };
  }

  deleteUser = id => {
    this.setState(prevState => {
      return { 
        users: prevState.users.filter( user => user.id !== id)
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul>
        { 
          this.state.users.map( user => {
            return <User 
              key={user.id} 
              name={user.name} 
              onDeleteClick={() => this.deleteUser(user.id)} />
          })
        }
        </ul>
      </div>
    );
  }
}

export default App;

render(<App />, document.getElementById('root'));

// User.js
import React from 'react';
// Note how the debugger below gets hit when *any* delete
// button is clicked. Why? Because the parent component
// uses an arrow function, which means this component
//
class User extends React.PureComponent {
  render() {
    const {name, onDeleteClick } = this.props
    console.log(`${name} just rendered`);
    return (
      <li>             
        <input 
          type="button" 
          value="Delete" 
          onClick={onDeleteClick} 
        /> 
        {name}
      </li>
    );
  }
}

export default User;

```
每次 render 调用时，控制台上都会打印日志。User 已经被声明为 PureComponent。所以 User 应该只在 props 或者 state 改变时才会重新 render。但是，当你点击 delete 按钮时，对于每一个 User 实例，都会调用 render。

原因在于：父组件在 props 中传递了一个箭头函数。箭头函数在每次 render 时都会重新分配（和使用 bind 的方式相同）。所以，尽管我将 User 声明为 PureComponent，User 的父组件中的箭头函数导致 User 组件为所有的用户实例传递了一个新的函数。所以当点击任何删除按钮时，每个用户实例都会重新 render。

结论：

避免在 render 中使用箭头函数和绑定。否则会打破 shouldComponentUpdate 和 PureComponent 的性能优化。

## 最佳实践

先来看个例子比较一下在 render 中不使用箭头函数的差异。

```jsx
// index.js
import React from 'react';
import { render } from 'react-dom';
import User from './User';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: 'Cory' }, 
        { id: 2, name: 'Meg' }, 
        { id: 3, name: 'Bob'}
      ],
    };
  }

  deleteUser = id => {
    this.setState(prevState => {
      return { 
        users: prevState.users.filter(user => user.id !== id) 
      };
    });
  };

  renderUser = user => {
    return <User key={user.id} user={user} onClick={this.deleteUser} />;
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {this.state.users.map(this.renderUser)}
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

// User.js
import React from "react";
import PropTypes from "prop-types";

// Note that the console.log below isn't called
// when delete is clicked on a user.
// That's because pureComponent's shallow
// comparison works properly here because
// the parent component isn't passing down
// an arrow function (which would cause this
// component to see a new function on each render)
class User extends React.PureComponent {
  onDeleteClick = () => {
    // No bind needed since we can compose the relevant data for this item here
    this.props.onClick(this.props.user.id);
  };

  render() {
    console.log(`${name} just rendered`);
    return (
      <li>
        <input 
          type="button" 
          value="Delete" 
          onClick={this.onDeleteClick} 
        />
        {this.props.user.name}
      </li>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default User;
```

在 User.js 中，onDeleteClick 调用了在 props 中传递的 onClick 函数，并传递了相应的 user.id。

当你再次点击 delete 按钮时，其他的用户再也不会调用 render 了！


参考： https://blog.csdn.net/luo1055120207/article/details/79025365