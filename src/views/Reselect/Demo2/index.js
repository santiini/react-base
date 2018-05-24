/**
 * 对比 Demo1， reselect 的对比
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Tag } from 'antd';

import * as shoppingActions from '@/reducers/Reselect/actions';
import { filterTypes } from '@/reducers/Reselect/shoppingCar';

class Demo2 extends PureComponent {

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

    // const { filterType } = this.props.shop;
    // const list = this.props.shop.items;
    // const types = filterTypes();
    // let items;
    // if (filterType === types.all) {
    //   items = list;
    // }
    // if (filterType === types.active) {
    //   items = list.filter((item) => !item.isCompleted);
    // }
    // if (filterType === types.completed) {
    //   items = list.filter((item) => item.isCompleted)
    // }
    return (
      <div className="todo-list">
        {
          renderList.map((item, i) => (
            <div className="demo2" key={`key_${i}`}>
              <div className="">{item.name}</div>
            </div>
          ))
          // items && items.map((item) => (
          //   <div className="" key={item.id} style={{ display: 'flex', margin: '5px' }}>
          //     <div style={{ margin: '0 10px' }}>name: {item.name}</div>
          //     <div style={{ margin: '0 10px' }}>value: {item.value}</div>
          //     <div style={{ margin: '0 10px' }}>
          //       <Button size="small" onClick={() => this.test2(item.id)}>删除</Button>
          //       {
          //         !item.isCompleted
          //           ? <Button style={{ margin: '0 10px' }} size="small" onClick={() => this.finishTodo(item.id)}>完成</Button>
          //           : <Tag style={{ margin: '0 10px' }} color="green">已完成</Tag>
          //       }
          //     </div>
          //   </div>
          // ))
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

export default connect(mapStateToProps, mapDispatchToProps)(Demo2);
