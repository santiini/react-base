import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { Button, Form, Input, Modal, Icon, Tooltip } from 'antd';
//import actions
import { pushEvent } from '../actions/site'
const createForm = Form.create;
const FormItem = Form.Item;

class FormModal extends Component {

  constructor(props, context) {
    super(props, context)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = Object.assign({}, {
      visible: false
    }, this.props.state)
  }

  handleSubmit() {
    const { handleSubmit, form, dispatch, buttonText, modalTitle, classes, subclass } = this.props
    let isSuccess = true
    form.validateFields((errors, values) => {
      if(!!errors) {
        isSuccess = false
      }
    })
    if(!isSuccess) return
    let result = handleSubmit(form.getFieldsValue(), form)
    if (result){
      //dispatch(pushEvent({type: 'custom', category: `${classes}-${subclass}-确认${buttonText || modalTitle}`, code: classes}))
      this.setState({ visible: false })
      form.resetFields()
    }
    if (_.has(result, 'type') && result.type == 'addKol'){
       const { dispatch, teamId, campaignId } = result
       Modal.confirm({
        title: '加入成功',
        iconType: "check-circle-o",
        okText: "查看项目",
        cancelText: "继续挑选",
        onOk() {
          let path = `/kol/app/team/${teamId}/campaign/${campaignId}/kol`
          dispatch(push(path))
        },
        onCancel() {},
      });
    }
  }

  showModal() {
    const {dispatch, buttonText, modalTitle, classes, subclass} = this.props
    this.setState({ visible: true })
    dispatch(pushEvent({type: 'custom', category: `${classes}-${subclass}-${buttonText || modalTitle}`, code: classes}))
  }

  hideModal(e) {
    const {dispatch, buttonText, modalTitle, classes, subclass} = this.props
    if(!["SPAN", "BUTTON"].includes(e.target.nodeName)) return
    this.props.form.resetFields();
    this.setState({ visible: false })
    dispatch(pushEvent({type: 'custom', category: `${classes}-${subclass}-取消${buttonText ||  modalTitle}`, code: classes}))
  }

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    let item
    if(this.props.type == 'a') {
      item = <a onClick={this.showModal}>{this.props.text}</a>
    } else if(this.props.type ==  'img') {
      item = <img src={this.props.src} height="20" style={{cursor: 'pointer'}} onMouseOver={this.showModal} />
    } else if(this.props.type == 'icon') {
      item = <Icon type="plus-square" onClick={this.showModal} style={{fontSize:20, cursor: 'pointer'}}/>
    } else if(this.props.type == 'span') {
      item = <span onClick={this.showModal} style={{cursor: 'pointer'}}>{this.props.text}</span>
    } else {
      const LinkBtn = <a href="https://client.socialmaster.com.cn/kol" style={{"color": '#68BD60'}} target="_blank">请前往新系统!</a>
      const JoinBtn = (
          <Button
          type={this.props.buttonType || "primary"}
          onClick={this.showModal}
          disabled={this.props.disabled}
          className={_.has(this.props, 'className') ? this.props.className : "custom-btn"}
          id={this.props.id || ''}
        >
          {this.props.buttonText}
        </Button>
      );
      const AddBtn = (
        <Tooltip title={LinkBtn}>
          <Button
            type={this.props.buttonType || "primary"}
            onClick={this.showModal}
            disabled={this.props.disabled}
            className={_.has(this.props, 'className') ? this.props.className : "custom-btn"}
            id={this.props.id || ''}
          >
            {this.props.buttonText}
          </Button>
        </Tooltip>
      );
      item = this.props.type === 'join' ? JoinBtn : AddBtn;
    }
    return (
      <div style={{ display: 'inline-block', padding: '10px 0', ...this.props.style }}>
        {item}
        <Modal
          title={this.props.modalTitle}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          className={this.props.hiddenButton ? 'cutom-display' : ''}
        >
          {this.props.renderForm(this.props.form, getFieldProps, this)}
        </Modal>
      </div>
    )
  }
}

export default createForm()(FormModal)
