/**
 * render() 渲染函数中的优化，避免 re-render
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import Post from './Post';
import { PreviousMap } from 'postcss';

class RenderFunc extends PureComponent {
  
  static propTypes = {
    posts: PropTypes.array.isRequired,
  }

  state = {
    title: '文章 top10:',
    clickTime: 0,
    topTen: [],
  }

  // 优化: 在 willMount 和 WillReceiveProps 中进行数据的初次处理和更新处理;
  componentWillMount() {
    this.setTopTenPosts(this.props.posts);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts !== nextProps.posts) {
      this.setTopTenPosts();
    }
  }

  reRender = () => {
    console.log('re-render');
    this.setState((preState) => ({
      title: '文章 top10更新了:',
      clickTime: preState.clickTime + 1,
    }));
  }

  setTopTenPosts = (posts) => {
    this.setState({
      topTen: posts.sort((a, b) => b.likes - a.likes).slice(0, 9),
    })
  }

  /**
   * tips:
   * 1. 不要在render中的函数绑定值:
   *  即不要在 render 中使用箭头函数，也不要在箭头函数中传参: <CommentItem likeComment={() => this.likeComment(user.id)} />
   * 2. 不要在render方法中获取数据:
   *  这里不仅仅是指通过网络请求去获取数据，还包括变量操作去赋值，进行大量的计算;
   *  const topTen = posts.sort((a, b) => b.likes - a.likes).slice(0, 9)
   *  组件每次re-render时，topTen变量都会是一个全新的引用值，哪怕posts变量值没有发生改变或者slice的结果也没有发生变化。
   *  但这仍然会对文章列表产生没有必要的re-render。
   * 
   *  解决： 你可以缓存你获取的数据来解决这个问题：把获取数据操作放入state中，并且仅在posts属性发生更新时更新。
   *  
   */
  render() {
    console.log('renderFunc render');
    // const { posts } = this.props;
    // const topTen = posts.sort((a, b) => b.likes - a.likes).slice(0, 9);
    return (
      <div className="">
        <h4>title{this.state.clickTime}: {this.state.title}</h4>
        <Button onClick={this.reRender}>re-render</Button>
        <Post
          posts={this.state.topTen}
        />
      </div>
    )
  }
}

export default RenderFunc;