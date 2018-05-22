/**
 * 展示型组件: Dumb 组件
 * 1. 不要使用 Immutable 对象
 * 2. 使用 Hoc(高阶组件) 把 Smart 组件传入的 immutable 的 props 解析;
 */
import React, { PureComponent } from 'react'
import { Card, Button, Spin } from 'antd';

import './post.styl';
// 单个 Post
const Post = (props) => {
  const { handleDelete, post } = props;
  const deleteOne = () => {
    handleDelete(post.id);
  }
  return (
    <div className="post">
      <div className="post-title">
        {post.name}
      </div>
      <Button onClick={deleteOne}>删除该项</Button>
    </div>
  )
}

// Post 列表
// const Posts = (props) => {
//   const { handleDelete, item } = props;
//   const deleteOne = () => {
//     handleDelete(item.id);
//   }
//   return (
//     <div className="item" key={`key_${item.id}`} >
//       <div className="">
//         {item.name}
//       </div>
//       <Button onClick={deleteOne}>删除该项</Button>
//     </div>
//   )
// }

class PostList extends PureComponent {
  refresh = () => {
    this.props.fetchData();
  }

  deleteOne = (id) => {
    console.log(id);
    this.props.deleteOne(id);
  }

  render() {
    return (
      <div className="">
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
      </div>
    );
  }
}

export default PostList;
