/**
 * react 中 reselect 的使用;
 */
import React, { PureComponent } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'react-redux';

import * as shoppingActions from '@/reducers/Reselect/actions';

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

  render() {
    console.log(this.props);
    const { items, taxPercent} = this.props.shop;
    return (
      <div className="shopping-car">
        <Card title={this.state.title}>
          <h4>测试reselect: {taxPercent}</h4>
          <div className="test-btn">
            <Button onClick={this.test1}>test1</Button>
          </div>
          {
            items && items.map((item) => (
              <div className="" key={item.id} style={{display: 'flex', margin: '5px'}}>
                <div className="">name: {item.name}</div>
                <div className="">value: {item.value}</div>
                <div className="">
                  <Button size="small" onClick={() => this.test2(item.id)}>删除</Button>
                </div>
              </div>
            ))
          }
        </Card>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCar);
