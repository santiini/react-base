/**
 * Lodash.chain
 */
import React, { PureComponent } from 'react';
import { Card, Table, Button } from 'antd';

class ChainCom extends PureComponent {
  state = {
    list: [
      { name: '黄鼠', type: 'animal', value: 1 },
      { name: '白杨', type: 'plant', value: 2 },
      { name: '飞机', type: 'mechine', value: 3 },
      { name: '兔子', type: 'animal', value: 1 },
      { name: '蒲苇', type: 'plant', value: 2 },
      { name: '秒表', type: 'mechine', value: 3 },
      { name: '猴子', type: 'animal', value: 1 },
      { name: '海草', type: 'plant', value: 2 },
      { name: '电脑', type: 'mechine', value: 3 },
      { name: '大象', type: 'animal', value: 1 },
      { name: '蒲公英', type: 'plant', value: 2 },
      { name: '手机', type: 'mechine', value: 3 },
      { name: '熊猫', type: 'animal', value: 1 },
      { name: '萝卜', type: 'plant', value: 2 },
      { name: 'ipad', type: 'mechine', value: 3 },
    ],
    animalTotal: 0,
    platnTotal: 0,
    mechineTotal: 0,
  }

  calculateSum = () => {
    const { list } = this.state;
    const animalTotal = _.chain(list)
      .filter((item) => item.type === 'animal')
      .sumBy((item) => item.value)
      .value();
    const platnTotal = _.chain(list)
      .filter((item) => item.type === 'plant')
      .sumBy((item) => item.value)
      .value();
    const mechineTotal = _.chain(list)
      .filter((item) => item.type === 'mechine')
      .sumBy((item) => item.value)
      .value();
    this.setState({ animalTotal, platnTotal, mechineTotal })
  }

  render() {
    const columns = [
      { title: '名字', dataIndex: 'name', key: 'name' },
      { title: '类别', dataIndex: 'type', key: 'type' },
      { title: '价值', dataIndex: 'value', key: 'value' },
    ];
    return (
      <div className="chain-demo">
        <Card title="chain链式操作">
          <Table
            dataSource={this.state.list}
            columns={columns}
          />
          <div className="btn-group">
            <Button onClick={this.calculateSum}>分类求和</Button>
          </div>
          <div className="total">
            <div className="total-1">动物: {this.state.animalTotal}</div>
            <div className="total-1">植物: {this.state.platnTotal}</div>
            <div className="total-1">机械: {this.state.mechineTotal}</div>
          </div>
        </Card>
      </div>
    )
  }
}

export default ChainCom;
