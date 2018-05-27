import React, { PureComponent } from 'react';
import { Table, Card, Button } from 'antd';
import { connect } from 'react-redux';

import toJS from '@/utils/toJS';
// import * as foodActions from '@/actions/Immu/shopping';

// Table 配置项
// 1. locale 按钮对应的文字，默认文案设置，目前包括排序、过滤、空数据文案
const locale = {
  filterConfirm: '确定',
  filterReset: '重置',
};

@connect((state) => ({
  food: state.food,
}))
@toJS
class AntdTable extends PureComponent {
  state = {
    list: [],
    // filterInfo 对应 Table 的 filter 控制变量;
    // sorterInfo 对应 Table 的 sorter 控制变量;
    filterInfo: null, // null 和 undefined 在 es6 结构赋值时的区别;
    sorterInfo: null,
    // filterInfo: undefined, // null 和 undefined 在 es6 结构赋值时的区别; 但是 Table 组件只能识别 null
    // sorterInfo: undefined,
  }

  // Table onChange 回调
  tableChange = (pagination, filters, sorter) => {
    console.log(pagination);
    console.log(filters);
    console.log(sorter);
    this.setState({
      filterInfo: filters,
      sorterInfo: sorter,
    })
  }

  // 清除 filters
  clearFilters = () => {
    this.setState({ filterInfo: null });
  }

  // 清除 filters 和 sorter
  clearAll = () => {
    this.setState({ filterInfo: null, sorterInfo: null });
  }

  // 按 id 排序
  setIdSort = () => {
    this.setState({
      sorterInfo: { order: 'descend', columnKey: 'id' },
    })
  }

  // 设置 filter 
  setFilter = () => {
    this.setState({
      filterInfo: { type: ['2'] },
    })
  }

  render() {
    // 没有 sorter 和 filter 时， 默认值为 {}, es6 结构赋值中 null 不能使用默认值;
    // const { sorterInfo = {}, filterInfo ={} } = this.state;
    const sorterInfo = this.state.sorterInfo || {};
    const filterInfo = this.state.filterInfo || {};
    const columns = [
      { title: '名字', dataIndex: 'name', key: 'name' },
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        sortOrder: sorterInfo.columnKey === 'id' && sorterInfo.order,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (value) => value === 1 ? '食物' : value === 2 ? '水果' : '主食',
        sorter: (a, b) => a.type - b.type,
        sortOrder: sorterInfo.columnKey === 'type' && sorterInfo.order,
        // filter: 筛选项内容，onFilter: 筛选值变化的回调函数;
        filters: [
          { text: '食物', value: 1 },
          { text: '水果', value: 2 },
          { text: '主食', value: 3 },
        ],
        // 配合上外部变量，可以控制 Table 的 filter
        filteredValue: filterInfo.type || null,
        // filters 会进行值得类型转换，这里 value 是 string;
        // onFilter 是本地 filter, 如果要配合请求 filter, 可以在 onChange 事件中进行请求;
        // onFilter: (value, record) => Number(record.type) === Number(value),
        onFilter: (value, record) => {
          console.log(value)
          return Number(record.type) === Number(value);
        },
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        // sorter: 排序函数, defaultSortOrder: 默认排序;
        defaultSortOrder: 'ascend',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
        sortOrder: sorterInfo.columnKey === 'price' && sorterInfo.order,
      },
      {
        title: '关注',
        dataIndex: 'followers',
        key: 'followers',
        sorter: (a, b) => a.followers - b.followers,
        sortOrder: sorterInfo.columnKey === 'followers' && sorterInfo.order,
        // filters 选项
        filters: [
          { text: '最爱', value: '666-0' },
          { text: '一般', value: '330-666' },
          { text: '讨厌', value: '0-330' },
        ],
        // 传入 filteredValue 作为 onFilter 中的 value
        filteredValue: filterInfo.followers || null,
        // filter 是否多选
        // // tips: 无论是否多选， onFilter 的 value 值都是转化后的 [ string ]
        filterMultiple: false,
        onFilter: (value, record) => {
          if (!value) return true;
          console.log(value);
          const [min, max] = value.split('-');
          return record.followers > min && (Number(max) === 0 || (max > 0 && record.followers < max))
        },
      },
    ];
    return (
      <div className="food-demo">
        <Card title="table && immutable.js">
          <div className="table-operations">
            <Button onClick={this.setIdSort}>Set Id</Button>
            <Button onClick={this.setFilter}>Set filter 水果</Button>
            <Button onClick={this.clearFilters}>Clear filters</Button>
            <Button onClick={this.clearAll}>clear filters and sorter</Button>
          </div>
          <Table
            rowKey="id"
            locale={locale}
            dataSource={this.props.food.list}
            columns={columns}
            onChange={this.tableChange}
          />
          <div className="btn-group">
            <h4>事件触发</h4>
          </div>
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

export default AntdTable;
