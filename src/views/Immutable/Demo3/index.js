/**
 * immutable.js 和 Redux 的使用测试;
 */
import React, { PureComponent } from 'react';
import { Table, Card, Button } from 'antd';
import { connect } from 'react-redux';

import toJS from '@/utils/toJS';
import * as foodActions from '@/actions/Immu/food';

const columns = [
  { title: 'id', dataIndex: 'id', key: 'id' },
  { title: '名字', dataIndex: 'name', key: 'name' },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: (value) => value === 1 ? '食物' : value === 2 ? '水果' : '主食',
    sorter: (a, b) => a.type - b.type,
    // filter: 筛选项内容，onFilter: 筛选值变化的回调函数;
    filters: [
      { text: '食物', value: 1 },
      { text: '水果', value: 2 },
      { text: '主食', value: 3 },
    ],
    // filters 会进行值得类型转换，这里 value 是 string;
    // onFilter 是本地 filter, 如果要配合请求 filter, 可以在 onChange 事件中进行请求;
    onFilter: (value, record) => Number(record.type) === Number(value),
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    // sorter: 排序函数, defaultSortOrder: 默认排序;
    defaultSortOrder: 'ascend',
    // defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  }
];

@connect((state) => ({
  food: state.food,
}))
@toJS
class Food extends PureComponent {
  state = {
    columns,
    list: [],
  }

  tableChange = (pagination, filters, sorter) => {
    console.log(pagination);
    console.log(filters);
    console.log(sorter);
  }

  fetchList = () => {
    this.props.dispatch(foodActions.fetch());
  }

  render() {
    console.log(this.props)
    return (
      <div className="food-demo">
        <Card title="immutable.js优化">
        <div className="btn-group">
            <Button onClick={this.fetchList}>fetch list</Button>
          </div>
          <Table
            rowKey="id"
            dataSource={this.props.food.list}
            columns={this.state.columns}
            onChange={this.tableChange}
          />
        </Card>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   food: state.food,
// });

// const mapDispatchToProps = ({
//   fetch: foodActions.fetch,
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Food);

export default Food;
