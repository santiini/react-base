import React, { Component } from 'react';
import { Card, Button } from 'antd';

import RenderFunc from './RenderFunc';

class PureCom extends Component {
  state = {
    title: 'render函数学习',
    posts: [
      { name: 'post11', id: 1, likes: 13 },
      { name: 'post22', id: 2, likes: 3 },
      { name: 'post33', id: 3, likes: 143 },
      { name: 'post44', id: 4, likes: 4 },
      { name: 'post55', id: 5, likes: 7 },
      { name: 'post66', id: 6, likes: 9 },
      { name: 'post77', id: 7, likes: 23 },
      { name: 'post88', id: 8, likes: 21 },
      { name: 'post99', id: 9, likes: 16 },
      { name: 'post00', id: 10, likes: 33 },
      { name: 'post1111', id: 11, likes: 55 },
      { name: 'post1222', id: 12, likes: 32 },
      { name: 'post1333', id: 13, likes: 27 },
      { name: 'post1444', id: 14, likes: 42 },
      { name: 'post1555', id: 15, likes: 73 },
      { name: 'post1666', id: 16, likes: 62 },
      { name: 'post1777', id: 17, likes: 51 },
      { name: 'post1888', id: 18, likes: 27 },
      { name: 'post1999', id: 19, likes: 24 },
      { name: 'post2000', id: 20, likes: 61 },
      { name: 'post2111', id: 21, likes: 82 },
      { name: 'post2222', id: 22, likes: 85 },
      { name: 'post2333', id: 23, likes: 90 },
      { name: 'post2444', id: 24, likes: 77 },
      { name: 'post2555', id: 25, likes: 62 },
      { name: 'post2666', id: 26, likes: 94 },
    ],
  }

  reRender = () => {
    this.setState({ title: 'Component re-render' });
  }

  render() {
    console.log('index render');
    return (
      <div className="">
        <Card title={this.state.title}>
          <Button onClick={this.reRender}>Component Render</Button>
          <h4>1. render函数的优化</h4>
          <RenderFunc
            posts={this.state.posts}s
          />
        </Card>
      </div>
    )
  }
}

export default PureCom;