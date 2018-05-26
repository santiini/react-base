/**
 * 展示型组件: Dumb 组件
 * 1. 不要使用 Immutable 对象
 * 2. 使用 Hoc(高阶组件) 把 Smart 组件传入的 immutable 的 props 解析;
 */
import React, { PureComponent } from 'react'
import { Card, Button, Spin, Tabs, Modal, Form, Input } from 'antd';

import Post from './Post';
import toJS from './toJs';
import './post.styl';

const { TabPane } = Tabs;
const { Item } = Form;

@toJS
@Form.create()
class PostList extends PureComponent {
  state = {
    modalVisible: false,
    currentPost: undefined,
    updatePosting: false,
  }

  componentWillReceiveProps(nextProps) {
    // if (this.state.updatePosting && !nextProps.posts.isRequesting) {
    //   this.setState({
    //     updatePosting: false,
    //     modalVisible: false,
    //   })
    // }
  }

  refresh = () => {
    this.props.fetchData();
  }

  deleteOne = (id) => {
    console.log(id);
    this.props.deleteOne(id);
  }

  updateOne = (id, post) => {
    this.setState({
      modalVisible: true,
      currentPost: post,
    });
    // this.props.updateOne(id, post);
  }

  // 关闭 Modal
  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  // 确认-更新数据
  modifyPost = () => {
    const { currentPost, updatePosting } = this.state;
    const formValue = this.props.form.getFieldsValue();
    this.setState({ updatePosting: true, modalVisible: false })
    this.props.updateOne(currentPost.id, { ...currentPost, name: formValue.name });
  }

  // render 函数中禁止使用 箭头函数 绑定事件;
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const { getFieldProps } = this.props.form;
    return (
      <div className="">
        <Modal
          title="修改信息"
          visible={this.state.modalVisible}
          okText="确认"
          cancelText="取消"
          onOk={this.modifyPost}
          onCancel={this.closeModal}
        >
          <Form>
            <Item label="姓名" {...formItemLayout}>
              <Input type="text" placeholder="请输入名称" {...getFieldProps('name', { initialValue: '小白' })} />
            </Item>
          </Form>
        </Modal>
        <Tabs>
          <TabPane tab="demo1" key="demo1">
            <Spin spinning={this.props.posts.isRequesting}>
              <Card title="展示型组件">
                <h4>Post 列表</h4>
                {
                  this.props.posts && this.props.posts.resource.data.map((item) => (
                    <Post
                      key={item.id}
                      post={item}
                      handleDelete={this.deleteOne}
                      handleUpdateOne={this.updateOne}
                    />
                  ))
                }
                <div className="">
                  <Button onClick={this.refresh}>fetchList</Button>
                </div>
              </Card>
            </Spin>
          </TabPane>
          <TabPane tab="demo2" key="demo2">
            <Card title="测试state.withMutations">
              <h4>测试</h4>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PostList;
