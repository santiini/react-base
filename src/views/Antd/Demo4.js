import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
} from 'antd';

const FormItem = Form.Item;
const createForm = Form.create;
const { TextArea } = Input;

@createForm()
class FormValidateDemo extends Component {
  static defaultProps = {
    form: {
      name: 'sunx',
    },
  }

  // 用户名验证
  userExist = (rule, value, callback) => {
    if (!value) {
      callback();
    } else {
      // console.log(rule);
      if (value === 'sunxt') {
        callback([new Error('该用户已注册')]);
      } else {
        callback();
      }
    }
  }

  checkPass = (rule, value, callback) => {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePwd'], { force: true });
    }
    callback();
  }

  checkRePwd = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback([new Error('两次密码不一致')]);
    } else {
      callback();
    }
  }

  checkDate = (rule, value, callback) => {
    console.log(value)
    // console.log(value.getTime());
    // if (value && value.getTime() > Date.now()) {
    //   callback([new Error('不能大于今天')]);
    // }
    callback();
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      // console.log(errors); // error object or null;
      // console.log(values); // values object
      if (!!errors) {
        console.log('errors in form');
        return;
      }
      console.log('submit ');
    });
  }

  resetForm = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  }

  render() {
    // props 相关方法
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    // props 的布局设置
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
    // props 的验证规则: rules
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: '至少五个字符' },
        { validator: this.userExist }
      ],
    });
    const passwdProps = getFieldProps('password', {
      rules: [
        { required: true, message: '请输入密码' },
        { validator: this.checkPass }
      ],
    });
    const rePwdProps = getFieldProps('rePwd', {
      rules: [
        { required: true, message: '请再次输入密码' },
        { validator: this.checkRePwd },
      ],
    });
    // 触发验证的两种方式
    const emailProps = getFieldProps('email', {
      validate: [
        {
          rules: [
            { required: true, message: '请输入邮箱' },
          ],
          trigger: ['onBlur']
        },
        {
          rules: [
            { type: 'email', message: '输入合法的邮箱格式' },
          ],
          trigger: ['onBlur', 'onChange'],
        },
      ]
    });
    const textProps = getFieldProps('textare', {
      rules: [
        { required: true, message: '简单的描述下吧', }
      ],
    });
    const dateProps = getFieldProps('datepicker', {
      rules: [
        { required: true, type: 'date', message: '选择日期' },
        // { validator: this.checkDate }
      ]
    });
    return (
      <div>
        <Form horizontal="true">
          <FormItem
            {...formItemLayout}
            label="姓名"
            hasFeedback
            help={isFieldValidating('name') ? '验证中...' : (getFieldError('name') || []).join(',')}
          >
            <Input placeholder="输入姓名" {...nameProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            <Input placeholder="输入密码" type="password" {...passwdProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="再次输入密码"
            hasFeedback
          >
            <Input placeholder="再次输入密码" type="password" {...rePwdProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮箱"
            hasFeedback
          >
            <Input placeholder="输入邮箱" type="email" {...emailProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="备注"
            hasFeedback
          >
            <TextArea placeholder="输入备注" {...textProps} rows="5" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="日期"
            hasFeedback
          >
            <DatePicker placeholder="日期选择" {...dateProps} />
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" onClick={this.submitForm}>提交</Button>&nbsp;
            <Button type="ghost" onClick={this.resetForm}>重置</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default FormValidateDemo;