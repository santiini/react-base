import React, { PureComponent } from 'react';
import { Button } from 'antd';

class PureCom1 extends PureComponent {
  state = {
    name: '测试PureComponent',
    list: [
      { id: 11, value: '第一个' },
      { id: 22, value: '第二个' },
      { id: 33, value: '第三个' },
      { id: 44, value: '第四个' },
    ]
  };

  changeItem = (user) => {
    console.log(user)
    console.log(user.value)
  }

  renderItem = (item, i) => {
    console.log(item);
    console.log(i);
    return (
      <div key={`item_${i}`}>
        <div>index: {i}, value: {item.value}</div>
        <Button onClick={this.changeItem}>改变value</Button>
      </div>
    )
  }

  render() {
    const { name, list } = this.state;
    return (
      <div className="">
        <h5>purecomponent 1</h5>
        <div className="">name： {name}</div>
        {
          list.map(this.renderItem)
        }
      </div>
    )
  }
}

export default PureCom1;
