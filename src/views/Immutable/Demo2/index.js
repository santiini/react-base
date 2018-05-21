/**
 * 简单使用 Immutable 数据在 react 组件中
 */
import React, { PureComponent } from 'react';
import { Card, Button } from 'antd';
import Immutable, { List } from 'immutable';

class Demo2 extends PureComponent {
  state = {
    // data: Immutable.Map({
    //   count: 0,
    //   todos: List(),
    // })
    data: Immutable.fromJS({
      count: 0,
      todos: [],
    })
  }

  handleAddClick = () => {
    this.setState(
      ({ data }) => ({
        data: data.update('todos', todos => todos.push(data.get('count'))),
      })
    );
    this.setState(
      ({ data }) => ({
        data: data.update('count', count => count + 1),
      })
    );

    // ????
    // this.setState(({ data }) => {
    //   return data.withMutations((res) => {
    //     data.update('todos', todos => todos.push(data.get('count')));
    //     data.set('count', count => count + 1);
    //     return data;
    //   })
    // })
  }

  renderList = (item, i) => (
    <div className="" key={`key_${i}`}>
      Saved: {item}
    </div>
  )

  render() {
    const { data } = this.state;
    return (
      <div className="">
        <Card title="测试2">
          <h4>Immutable 在 React 中</h4>
          <h4>count: {data.get('count')}</h4>
          <Button onClick={this.handleAddClick}>添加Add</Button>
          {
            data.get('todos').map(this.renderList)
          }
        </Card>
      </div>
    )
  }
}

export default Demo2;