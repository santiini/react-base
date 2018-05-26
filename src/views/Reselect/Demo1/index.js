/**
 * react 中 reselect 的使用;
 */
import React, { PureComponent } from 'react';
import { Card, Button, Tag } from 'antd';
import { connect } from 'react-redux';

import * as shoppingActions from '@/reducers/Reselect/actions';
import { getFilterTodos } from './todo';

// tips: Component 和 PureComponent 都可以配合 Reselct 避免不必要的 re-render;
// class ShoppingCar extends React.Component {
class ShoppingCar extends PureComponent {
  state = {
    title: '测试reselect',
    shopId: 11,
  }

  test1 = () => {
    this.setState((pre) => ({ shopId: pre.shopId + 1 }));
    this.props.add({ id: this.state.shopId, name: '土豆', value: 88 })
  }

  test2 = (id) => {
    this.props.remove(id);
  }

  finishTodo = (id) => {
    this.props.finish(id);
  }

  showAll = () => {
    this.props.changeFilter('all');
  }
  showCompleted = () => {
    this.props.changeFilter('completed');
  }
  showActive = () => {
    this.props.changeFilter('active');
  }

  render() {
    // tips: reselct 判断 this.props 没有变化， 不会一直渲染;
    console.log('reselect demo1 rendered')
    console.log(this.props);
    // const { items, taxPercent } = this.props.shop;
    const taxPercent = '错误';
    const items = this.props.todos;
    const style = { margin: '0 10px' };
    return (
      <div className="shopping-car">
        <Card title={this.state.title}>
          <h4>测试reselect: {taxPercent}</h4>
          <div className="test-btn">
            <Button onClick={this.test1}>test1</Button>
          </div>
          {
            items && items.map((item) => (
              <div className="" key={item.id} style={{ display: 'flex', margin: '5px' }}>
                <div style={style}>name: {item.name}</div>
                <div style={style}>value: {item.value}</div>
                <div style={style}>
                  <Button size="small" onClick={() => this.test2(item.id)}>删除</Button>
                  {
                    !item.isCompleted
                      ? <Button style={style} size="small" onClick={() => this.finishTodo(item.id)}>完成</Button>
                      : <Tag style={style} color="green">已完成</Tag>
                  }
                </div>
              </div>
            ))
          }
          <div className="filter-btn">
            <Button onClick={this.showAll}>All</Button>
            <Button onClick={this.showCompleted}>Completed</Button>
            <Button onClick={this.showActive}>Active</Button>
          </div>
        </Card>
      </div>
    )
  }
}


// reselect 的使用
// 1. 基础数据存在 redux 中
// 2. 计算性质的衍生数据由 state 和 Reselect 获取，为纯函数;
const mapStateToProps = (state, props) => ({
  todos: getFilterTodos(state, props),
})

const mapDispatchToProps = {
  getAll: shoppingActions.fetchAll,
  update: shoppingActions.update,
  remove: shoppingActions.remove,
  add: shoppingActions.add,
  finish: shoppingActions.finish,
  changeFilter: shoppingActions.changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCar);

/**
 * tips: 参考文章:
 * 1. https://zhuanlan.zhihu.com/p/29415032
 */
