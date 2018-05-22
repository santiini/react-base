/* eslint-disable */
import React, { Component } from 'react';
// import { Form, Input, Select, Checkbox, Radio } from 'antd';

// const { FormItem } = Form;

const CompanyList = ({ changeZone }) => {
  const list = [
    { id: 1, name: '公司A' },
    { id: 2, name: '公司B' },
    { id: 3, name: '公司C' },
    { id: 4, name: '公司D' },
    { id: 5, name: '公司E' },
    { id: 6, name: '公司F' },
  ];
  return (
    <div>
      <h4>子组件从父组件中获取company信息</h4>
      {
        list.map((company) => (
          <div key={company.id} onClick={() => changeZone(company.name)}>
            {company.name}
            <hr />
          </div>
        ))
      }
    </div>
  );
};

const FormInfo = ({ name, address, zone, changeName, changeAdd, changeType }) => {
  return (
    <div>
      <div className="">form2</div>
      <div className="">
        <label htmlFor="name">名字：</label>
        <input type="text" name="name" placeholder="输入名字" value={name} onChange={(e) => changeName(e.target.value)} />
      </div>
      <div className="">
        <label htmlFor="name">地址：</label>
        <input type="text" name="name" placeholder="输入地址" value={address} onChange={(e) => changeAdd(e.target.value)} />
      </div>
      <div className="" onClick={changeType}>
        <span className="">区域：</span>
        <span className="">{zone}</span>
      </div>
    </div>
  );
}

class KeepDemo extends Component {
  state = {
    type: 1,
    form: {
      name: '11',
      address: '22',
      zone: '33',
    },
  };

  render() {
    return (
      <div>
        <h5>Keep 父组件： 同步信息</h5>
        <div className="">
          <div className="">名称：{this.state.form.name}</div>
          <div className="">地址：{this.state.form.address}</div>
          <div className="">区域：{this.state.form.zone}</div>
        </div>
        {
          this.state.type === 1
            ? <FormInfo
              changeName={(value) => this.setState(prevState => ({ form: Object.assign({}, prevState.form, { name: value }) }))}
              changeAdd={(value) => this.setState(prevState => ({ form: Object.assign({}, prevState.form, { address: value }) }))}
              changeType={() => this.setState({ type: 2 })}
              {...this.state.form}
            />
            : <CompanyList
              name={this.state.form.name}
              changeZone={(val) => {
                this.setState(prevState => ({ form: Object.assign({}, prevState.form, { zone: val }) }));
                this.setState({ type: 1 });
              }}
            />
        }
      </div>
    )
  }
}

export default KeepDemo;