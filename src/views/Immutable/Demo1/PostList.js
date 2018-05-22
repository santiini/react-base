/**
 * 展示型组件: Dumb 组件
 * 1. 不要使用 Immutable 对象
 * 2. 使用 Hoc(高阶组件) 把 Smart 组件传入的 immutable 的 props 解析;
 */
import React, { PureComponent } from 'react'
import { Card, Button, Spin, Tabs } from 'antd';

import Post from './Post';
import toJS from './toJs';
import './post.styl';

const { TabPane } = Tabs;

@toJS
class PostList extends PureComponent {
  refresh = () => {
    this.props.fetchData();
  }

  deleteOne = (id) => {
    console.log(id);
    this.props.deleteOne(id);
  }

  // render 函数中禁止使用 箭头函数 绑定事件;
  render() {
    return (
      <div className="">
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
