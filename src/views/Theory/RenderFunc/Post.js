/**
 * Post 帖子子组件
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './index.styl'

class Post extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
  }

  renderItem = (item, i) => (
    <div className="post-item" key={item.id}>
      <div className="">{i+1}. {item.name}</div>
      <div className="">id: {item.id}</div>
      <div className="">ikes: {item.likes}</div>
    </div>
  )

  render() {
    console.log('Post render');
    return (
      <div>
        <h4>文章列表: </h4>
        {
          this.props.posts.map(this.renderItem)
        }
      </div>
    )
  }
}

export default Post;