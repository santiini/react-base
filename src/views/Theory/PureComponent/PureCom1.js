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

  // 在 PureComponent 中， 会对 state 和 props 的值进行浅比较，只有不一致时，才会重新渲染:
  //  1. 简单值: 比较值是否一致
  //  2. 复杂对象， 会比较内存指向知否一致;
  // tips:  不要改变 props 和 state 中的对象和数组，因为这样的话，纯子组件不会更新，正确做法是:
  //      借助ES6的object新特性、array的扩展运算符或者使用不可变工具库来返回新对象，即改变对象的引用; 
  changeItem = (id) => () => {
    console.log(id);
    // 测试 PureComponent
    this.state.list.forEach((item, i) => {
      if (item.id === id) {
        item.value = 'checked'
      }
    })
  }

  renderItem = (item, i) => {
    // console.log(item);
    return (
      <div key={`item_${i}`}>
        <div>index: {i}, value: {item.value}</div>
        <Button onClick={this.changeItem(item.id)}>改变value</Button>
      </div>
    )
  }

  changeRender = () => {
    this.setState({ name: 'changed name' });
  }

  render() {
    console.log('purecom render');
    const { name, list } = this.state;
    return (
      <div className="">
        <h5>purecomponent 1</h5>
        <div className="">name： {name}</div>
        {
          list.map(this.renderItem)
        }
        <h5>改变导致 re-render</h5>
        <Button onClick={this.changeRender}>re-render</Button>
        <div className="">{name}</div>
      </div>
    )
  }
}

export default PureCom1;
