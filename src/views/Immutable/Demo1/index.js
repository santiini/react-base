/**
 * Post 的容器型组件，负责连接 redux，同时 toJS 转换 Immutable 数据为 js 对象;
 */
import { connect } from 'react-redux';

import Post from './Post';
import toJS from './toJs';

// Hoc 的作用:
// 禁止在 mapStateProps 中使用 toJS(), 导致每次 posts 的指向都发生变化，引起 re-rendered
// mapStateProps 中的 posts 仍然是 Immutable 数据;
const mapStateToProps = (state) => ({
  posts: state.posts,
})

export default connect(mapStateToProps)(toJS(Post));
