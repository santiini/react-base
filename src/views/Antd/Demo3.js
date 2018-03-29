import React, { Component } from 'react'
import {
  Form,
  Input,
} from 'antd';

const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
class FormValidateDemo extends Component {
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form horizontal="true" form={this.props.form}>

        </Form>
      </div>
    );
  }
}

export default FormValidateDemo;