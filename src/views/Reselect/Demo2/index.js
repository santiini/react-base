/**
 * 对比 Demo1， reselect 的对比
 * 总结建议：
 * 1. Component 和 shouldComponent 结合使用，可以避免不必要的 re-render
 * 2. PureComponent 最好和 Reselect 结合， 也可以避免不必要的 re-render
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Tag } from 'antd';

import * as shoppingActions from '@/reducers/Reselect/actions';
// import { filterTypes } from '@/reducers/Reselect/shoppingCar';

// tips: PureComponent 不推荐使用 shouldComponentUpdate
class Demo2 extends PureComponent {
  state = {
    renderList: [],
  }

  // tips： 如果不适用 shouldComponentUpdate, 就不能控制组件的刷新，因为 PureComponent 判断的是: state 和 props 的引用;
  // 这里 state 没有变化， 但是 redux 每次返回的 props 都是一个新的 props, 所以导致引用变化，进而 re-render;
  componentWillMount() {
    this.setState({ renderList: _.clone(this.props.shop) })
    // this.setState({ renderList: this.props.shop })
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.shop, nextProps.shop)) {
      console.log('值不同的赋值')
      this.setState({ renderList: _.clone(nextProps.shop) });
    }
  }

  test1 = () => {
    this.setState((pre) => ({ shopId: pre.shopId + 1 }));
    this.props.add({ id: this.state.shopId, name: '土豆', value: 88 })
  }

  test2 = (id) => {
    this.props.remove(id);
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
    console.log('demo2 rendered');
    // const renderList = this.state.renderList.items
    return (
      <div className="todo-list">
        {
          // tips: 无论是否声明变量，这两种形式都会 re-render， 根本原因是； this.props 发生变化，缺少 shouldComponentUpdate 的判断;
          // this.props.shop.items.filter((item) => !item.isCompleted).map((item, i) => (
          this.state.renderList.items.map((item, i) => (
            <div className="demo2" key={`key_${i}`}>
              <div className="">{item.name}</div>
            </div>
          ))
        }
        <div className="filter-btn">
          <Button onClick={this.showAll}>All</Button>
          <Button onClick={this.showCompleted}>Completed</Button>
          <Button onClick={this.showActive}>Active</Button>
        </div>
      </div>
    )
  }
}

// React.Component 可以使用 shouldComponentUpdate 判断更新
class Demo3 extends React.Component {
  shouldComponentUpdate(nextProps) {
    // 直接判断 === 判断并不准确;
    // if (this.props.shop === nextProps.shop) {
    if (_.isEqual(this.props.shop, nextProps.shop)) {
      return false;
    }
    return true;
  }

  test1 = () => {
    this.setState((pre) => ({ shopId: pre.shopId + 1 }));
    this.props.add({ id: this.state.shopId, name: '土豆', value: 88 })
  }

  test2 = (id) => {
    this.props.remove(id);
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
    console.log('demo2 rendered');
    const renderList = this.props.shop.items.filter((item) => !item.isCompleted)
    return (
      <div className="todo-list">
        {
          // tips: 无论是否声明变量，这两种形式都会 re-render， 根本原因是； this.props 发生变化，缺少 shouldComponentUpdate 的判断;
          // this.props.shop.items.filter((item) => !item.isCompleted).map((item, i) => (
          renderList.map((item, i) => (
            <div className="demo2" key={`key_${i}`}>
              <div className="">{item.name}</div>
            </div>
          ))
        }
        <div className="filter-btn">
          <Button onClick={this.showAll}>All</Button>
          <Button onClick={this.showCompleted}>Completed</Button>
          <Button onClick={this.showActive}>Active</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shop: state.shopping,
});

const mapDispatchToProps = {
  getAll: shoppingActions.fetchAll,
  update: shoppingActions.update,
  remove: shoppingActions.remove,
  add: shoppingActions.add,
  finish: shoppingActions.finish,
  changeFilter: shoppingActions.changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo3);
// export default connect(mapStateToProps, mapDispatchToProps)(Demo2);
