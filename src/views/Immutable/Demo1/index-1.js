import React, { PureComponent } from 'react'
import { Card } from 'antd';
import { connect } from 'react-redux';

import Post from './Post';
import toJS from './toJs';

// @connect((state) => ({
//   posts: state.posts,
// }))
class ImmutableDemo1 extends PureComponent {
  render() {
    console.log(this.props)
    return (
      <div className="">
        <Card title="immutable测试">
          <div className="">测试immutable</div>
          <Post
            list={this.props.posts.data}
          />
        </Card>
      </div>
    )
  }
}

// Hoc 的作用:
// 禁止在 mapStateProps 中使用 toJS(), 导致每次 posts 的指向都发生变化，引起 re-rendered
const mapStateToProps = (state) => ({
  posts: state.posts,
})

export default connect(mapStateToProps)(toJS(ImmutableDemo1));
