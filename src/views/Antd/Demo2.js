import React, { Component } from 'react';
import { Form, Input, Select, Checkbox, Radio } from 'antd';


const { Item } = Form;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Textarea = Input.TextArea;

export default class Demo2 extends Component {
  render() {
    return (
      <Form horizontal="true">
        <Item label="所属" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <p>Admaster</p>
        </Item>
        <Item label="姓名" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Input placeholder="请输入姓名" />
        </Item>
        <Item label="密码" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Input placeholder="请输入密码" type="password" />
        </Item>
        <Item label="简要描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          {/* <Input type="textarea" rows={3} /> */}
          <Textarea placeholder="简要描述" rows="3" />
        </Item>
        <Item label="选项" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Select placeholder="请选择">
            <Option value="1"> 选项1</Option>
            <Option value="2"> 选项2</Option>
            <Option value="3"> 选项3</Option>
            <Option value="4"> 选项4</Option>
          </Select>
        </Item>
        <Item label="复选框" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Checkbox >可选1</Checkbox>
          <Checkbox >可选2</Checkbox>
          <Checkbox >可选3</Checkbox>
        </Item>
        <Item label="复选框2" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <CheckboxGroup
            options={[{ label: '复选1', value: 1 }, { label: '复选2', value: 2 }, { label: '复选3', value: 3 }]}
            defaultValue={[2]}
          />
        </Item>
        <Item label="单选框1" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <RadioGroup defaultValue={3}>
            <Radio value={1}>单选11</Radio>
            <Radio value={2}>单选22</Radio>
            <Radio value={3}>单选33</Radio>
          </RadioGroup>
        </Item>
      </Form>
    );
  }
}