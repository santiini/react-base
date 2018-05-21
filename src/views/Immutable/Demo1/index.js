import React, { PureComponent } from 'react'
import { Card, Button } from 'antd';
import { connect } from 'react-redux';

import Post from './Post';

@connect((state) => ({
  posts: state.posts,
}))
class ImmutableDemo1 extends PureComponent {

  renderPost = (item) => {

  }

  render() {
    return (
      <div className="">
        <Card title="immutable测试">
          <div className="">测试immutable</div>
          {
          }
        </Card>
      </div>
    )
  }
}

export default ImmutableDemo1;
