import React, { Component } from 'react';
import { Tabs, Button } from 'antd';

const { TabPane } = Tabs;

const ChildCom1 = (props) => {
  return (
    <div className="">
      <h3>子组件</h3>
      <div className="">state 传参：{props.name}</div>
      <div className="">实例属性 传参：{props.title}</div>
    </div>
  )
};

class PropsComponent extends Component {
  state = {
    name1: 'state11',
    title1: 'title11',
  }
  name2 = 'name22';
  title2 = 'title22';

  changeState = () => {
    this.setState({
      name1: 'state111111',
      title1: 'titile1111111111',
    });
  }

  // 结果说明: 通过 this.attrs 实例属性传递参数给子组件，则: 传递的参数不会动态变化;
  // this.atrrs 实例属性不能用于页面渲染、组件传参等;
  changeAttrs = () => {
    this.name2 = 'name222222';
    this.title2 = 'title2222222222';
    console.log(this.name2);
    console.log(this.title2);
  }

  render() {
    const { name1, title1 } = this.state;
    return (
      <div className="">
        <h4>props传参: state 传参 和 this.name 实例属性传参</h4>
        <Tabs>
          <TabPane tab="state传参" key="prop_1">
            <div className="">
              <ChildCom1
                name={name1}
                title={title1}
              />
              <Button onClick={this.changeState}>改变state</Button>
            </div>
          </TabPane>
          <TabPane tab="实例属性传参" key="prop_2">
            <div className="">
              <ChildCom1
                name={this.name2}
                title={this.title2}
              />
              <Button onClick={this.changeAttrs}>改变attrs</Button>
            </div>
          </TabPane>
          <TabPane tab="redux" key="prop_3">
            <div className="">redux</div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}


export default PropsComponent;