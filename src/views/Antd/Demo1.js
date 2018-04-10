import React, { Component } from 'react';
import { Form, Input, Select, Checkbox, Radio, InputNumber, Switch, Slider, Cascader, Col, DatePicker, TimePicker, Upload, Button } from 'antd';


const { Item } = Form;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Textarea = Input.TextArea;

// Form.create(): 组件经过 Form.create() 后, 会自带 this.props.form 属性，并拥有 getFieldsValue 等Api;
@Form.create()
class Demo1 extends Component {
  getAddress = (e, label, option) => {
    console.log(option.address);
    e.stopPropagation();
    e.preventDefault();
  }

  submitForm = (e) => {
    const formData = this.props.form.getFieldsValue();
    e.preventDefault();
    console.log(formData);
    // 时间格式的处理;
    console.log(formData.startDate);
    console.log(new Date(formData.startDate));
    console.log(new Date(formData.startDate).getTime());
  }

  render() {
    const { getFieldProps } = this.props.form;
    // const marks = {
    //   0: '周一', 10: '周二', 20: '周三', 30: '周四', 40: '周五', 50: '周六', 60: '周日',
    // };
    // const marks1 = {
    //   0: '0°C',
    //   26: '26°C',
    //   37: '37°C',
    //   100: {
    //     style: {
    //       color: 'red',
    //     },
    //     label: <strong>100°C</strong>,
    //   },
    // };
    const cascaderData = [
      {
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'haidian',
            label: '海淀',
            children: [
              { label: '西一里', value: 'xiyili', address: '6-302' },
              { label: '西二里', value: 'xierli', address: '9-401' },
              { label: '育新家园', value: 'yuxinjiayuan', address: '2-202' },
            ]
          },
          {
            value: 'daxing',
            label: '大兴',
            children: [
              { label: '枣园', value: 'zaoyuan', address: '19-302' },
              { label: '西红门', value: 'xihongmen', address: '14-401' },
              { label: '黄庄', value: 'huangzhuang', address: '28-202' },
            ]
          },
        ]
      },
      {
        value: 'luoyang',
        label: '洛阳',
        children: [
          {
            value: 'jianxi',
            label: '涧西',
            children: [
              { label: '一中', value: 'yizhong', address: '1-302' },
              { label: '5111医院', value: '5111', address: '2-401' },
              { label: '辛店镇', value: 'xindian', address: '50-80' },
            ]
          },
          {
            value: 'gushui',
            label: '谷水',
            children: [
              { label: '321', value: '321', address: '29-302' },
              { label: '666', value: '666', address: '5-401' },
              { label: '888', value: '888', address: '14-202' },
            ]
          },
        ]
      },
    ];
    return (
      <Form horizontal="true" onSubmit={this.submitForm}>
        <Item label="所属" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <p>Admaster</p>
        </Item>
        <Item label="年份" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <InputNumber max={2050} min={2000} {...getFieldProps('inputNumber', { initialValue: 2018 })} />
          <span className="">年开始</span>
        </Item>
        <Item label="姓名" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Input placeholder="请输入姓名" {...getFieldProps('username')} />
        </Item>
        <Item label="密码" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Input placeholder="请输入密码" type="password" {...getFieldProps('password')} />
        </Item>
        <Item label="Switch开关" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Switch {...getFieldProps('switch', { valuePropName: 'checked' })} />
        </Item>
        <Item label="Slider滑块" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} required>
          <Slider
            marks={{ 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六', 0: '周日' }}
            step={1}
            min={0}
            max={6}
            {...getFieldProps('slider')}
          />
          {/*<Slider marks={['A', 'B', 'C', 'D', 'E', 'F', 'G']} step={1} min={0} max={6} {...getFieldProps('slider')} /> */}
          {/* <Slider marks={marks} min={0} max={60} step={null} {...getFieldProps('slider')} /> */}
        </Item>
        <Item label="简要描述" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          {/* <Input type="textarea" rows={3} /> */}
          <Textarea placeholder="简要描述" rows="3" {...getFieldProps('describition')} />
        </Item>
        <Item label="选项" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Select placeholder="请选择" {...getFieldProps('select')}>
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
            {...getFieldProps('checkbox2')}
          />
        </Item>
        <Item label="单选框1" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <RadioGroup defaultValue={3} {...getFieldProps('radio')}>
            <Radio value={1}>单选11</Radio>
            <Radio value={2}>单选22</Radio>
            <Radio value={3}>单选33</Radio>
          </RadioGroup>
        </Item>
        <Item label="级联选择" labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
          <Cascader
            placeholder="请选择"
            options={cascaderData}
            expandTrigger="hover"
            displayRender={
              (labels, selectedOptions) => labels.map((label, i) => {
                const option = selectedOptions[i];
                if (i === labels.length - 1) {
                  return (
                    <span key={option.value}>
                      {label}(<a onClick={(e) => this.getAddress(e, label, option.address)}>{option.address}</a>)
                    </span>
                  );
                }
                return (<span key={option.value}>{label} /</span>);
              })
            }
            {...getFieldProps('cascader')}
          />
        </Item>
        <Item label="日期选择" labelCol={{ span: 6 }} required>
          <Col span="6">
            <Item>
              <DatePicker placeholder="开始日期" {...getFieldProps('startDate')} />
            </Item>
          </Col>
          <Col span="1">
            <span>-</span>
          </Col>
          <Col span="6">
            <Item>
              <DatePicker placeholder="结束日期" {...getFieldProps('endDate')} />
            </Item>
          </Col>
        </Item>
        <Item label="时间选择" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <TimePicker placeholder="定时" {...getFieldProps('orderTime')} />
        </Item>
        <Item label="单选按钮" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <RadioGroup {...getFieldProps('radioGroup')}>
            <RadioButton value="a">按钮11</RadioButton>
            <RadioButton value="b">按钮22</RadioButton>
            <RadioButton value="c">按钮33</RadioButton>
          </RadioGroup>
        </Item>
        <Item label="上传" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Upload name="logo" action="/logo.do">
            <Button type="ghost">点击上传</Button>
          </Upload>
        </Item>
        <Item wrapperCol={{ span: 16, offset: 6 }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Item>
      </Form>
    );
  }
}

export default function FormDemo1() {
  return (
    <div>
      <Demo1 />
    </div>
  );
}