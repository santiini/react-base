/**
 * Post 的容器型组件，负责连接 redux，同时 toJS 转换 Immutable 数据为 js 对象;
 */
import { connect } from 'react-redux';

import Post from './PostList';
// import toJS from './toJs'; // 这是一种使用方式;

import * as postActions from '@/actions/immutable/Post';

// Hoc 的作用:
// 禁止在 mapStateProps 中使用 toJS(), 导致每次 posts 的指向都发生变化，引起 re-rendered
// mapStateProps 中的 posts 仍然是 Immutable 数据;
const mapStateToProps = (state) => ({
  posts: state.posts,
});

// const mapDispatchToProps = (dispatch) => ({
//   fetchList: () => dispatch(postActions.fetch()),
// })

const mapDispatchToProps = {
  fetchData: postActions.fetch,
  deleteOne: postActions.deletePost,
};

// export default connect(mapStateToProps, mapDispatchToProps)(toJS(Post)); // 这是一种使用方式;
export default connect(mapStateToProps, mapDispatchToProps)(Post);
