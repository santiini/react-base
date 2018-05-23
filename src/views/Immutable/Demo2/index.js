/**
 * 简单使用 Immutable 数据在 react 组件中, 总结:
 * 1. Immutable 的链式使用
 * 2. state.withMutations((data) => { }), 可以执行一系列 Immutable 操作;
 * 3. 获取每次 Immutable 操作的数据，最终返回正确的数据;
 */
import React, { PureComponent } from 'react';
import { Card, Button } from 'antd';
import Immutable from 'immutable';

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

  // immutable 在 react 组件中的使用
  handleAddClick = () => {
    // 方式1： 麻烦一点的;
    // 1. 复杂但是能够实现
    // this.setState(
    //   ({ data }) => ({
    //     data: data.update('todos', todos => todos.push(data.get('count'))),
    //   })
    // );
    // this.setState(
    //   ({ data }) => ({
    //     data: data.update('count', count => count + 1),
    //   })
    // );
    // 2. 简单实现
    this.setState(({ data }) => ({
      data: data.update('todos', todos => todos.push(data.get('count'))).set('count', data.get('count') + 1),
    }))

    // 方式2：withMutations() -- 推荐
    // this.setState(({ data }) => {
    //   const newData = data.withMutations((res) => {
    //     res.update('todos', todos => todos.push(res.get('count')));
    //     res.set('count', res.get('count') + 1);
    //   });
    //   return { data: newData };
    // });


    // 方式3：
    // this.setState(({ data }) => {
      // 1. 分开使用;
      // const newData = data.update('todos', (todos) => todos.push(data.get('count')));
      // const newData2 = newData.set('count', newData.get('count') + 1);

      // 2. 链式使用--推荐;
      // const newData2 = data.update('todos', (todos) => todos.push(data.get('count')))
      //   .set('count', data.get('count') + 1);
      // return { data: newData2 };
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