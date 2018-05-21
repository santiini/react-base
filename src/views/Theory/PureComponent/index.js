import React, { Component } from 'react';
import { Card, Button } from 'antd';

import PureDemo2 from './PureCom1';
import User from './User';

class PureCom extends Component {
  state = {
    title: 'PureComponent学习',
    user: [
      { name: '小花', id: 1 },
      { name: '小白', id: 2 },
      { name: '小黑', id: 3 },
      { name: '小红', id: 4 },
    ],
  }

  reRender = () => {
    this.setState({ title: 'Component re-render' });
  }

  /**
   * 1. 当以箭头函数的形式使用时， 父组件每次 render 时导致箭头函数的指向重新分配， 父组件重新为子组件传入了新的箭头函数;
   *    这样，即使子组件是 PureComponent，指向变化导致了重新 render, 即使 state, props 的实际执行内容没有变化;
   *  
   * tips1: 避免在 render 中使用箭头函数和绑定。否则会打破 shouldComponentUpdate 和 PureComponent 的性能优化。
   * 
   * tips2: 优化使用
   * 把 user 和 onDeleteClick 都作为 props 传入, 避免重新渲染，因为传入的 props 的指向没有变化;
   * 
   * tips3: 在 PureComponent 中，只会对 state 和 props 进行浅比较，只会比较 1.基本数据的值是否相等; 2. 复杂对象只比较引用值
   *    React.Component 则不会比较两者的新旧值比较，都会 re-render;
   * 
   * tips4: 不要改变 props 和 state 中的对象和数组，因为这样的话，纯子组件不会更新，正确做法是:
   *    借助ES6的object新特性、array的扩展运算符或者使用不可变工具库来返回新对象，即改变对象的引用;
   */
  deleteUser = (id) => {
    this.setState((preState) => ({
      user: preState.user.filter((user) => user.id !== id),
    }))
  }

  render() {
    console.log('index render');
    const { user } = this.state;
    return (
      <div className="">
        <Card title={this.state.title}>
          <Button onClick={this.reRender}>Component Render</Button>
          <h4>1. PureComponent学习</h4>
          <PureDemo2 />
          <h4>2. User：箭头函数的react问题</h4>
          {
            user.map((user) => (
              <User
                key={user.id}
                user={user}
                // onDeleteClick={() => this.deleteUser(user.id)}
                onDeleteClick={this.deleteUser}
              />
            ))
          }
        </Card>
      </div>
    )
  }
}

export default PureCom;