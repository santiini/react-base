import React from 'react'
import { Button } from 'antd';

// 单个 Post
const Post = (props) => {
  const { handleDelete, post, handleUpdateOne } = props;
  const deleteOne = () => {
    handleDelete(post.id);
  }
  const updateOne = () => {
    handleUpdateOne(post.id, { ...post, name: '新的内容' });
  };
  return (
    <div className="post">
      <div className="post-title">
        {post.name}
      </div>
      <Button onClick={updateOne}>更新该项信息</Button>
      <Button onClick={deleteOne}>删除该项</Button>
    </div>
  )
}

export default Post;