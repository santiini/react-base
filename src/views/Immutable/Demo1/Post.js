import React from 'react'
import { Button } from 'antd';

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

export default Post;