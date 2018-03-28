import React, { Component } from 'react';
import { Button, List } from 'antd';
import { connect } from 'react-redux';

import { getPostDetail as getPostInfo } from '../../redux/actions';
import { getList, getDetail, createTopic, testError } from '@/api/cnode';
import './demo5.styl';

@connect(state => ({
  post: state.post,
}))
class Demo5 extends Component {
  state = {
    list: [],
  }

  getPost = () => {
    const id = this.state.list[0].id
    this.props.dispatch(getPostInfo(id))
  }

  getError = () => {
    testError()
      .then((result) => {
        console.log(result);
      })
      .catch(err => console.error(err))
  }

  handleClick = (item) => {
    console.log(item)
    getDetail(item.id)
      .then(((result) => {
        console.log(result);
      }))
      .catch(err => console.error(err));
  }

  publicTopic = () => {
    createTopic()
      .then((result) => {
        console.log(result);
      })
      .catch(err => console.error(err));
  }

  componentWillMount() {
    getList(1, 5)
      .then((result) => {
        console.log(result)
        this.setState({
          list: result.data
        })
      })
      .catch(err => console.error(err))
  }

  render() {
    const { list } = this.state;
    const { Item } = List;
    console.log(this.props.post)
    return (
      <div className="demo5">
        <h4>demo5: fetch 来做网络请求</h4>
        <div className="">
          <Button>测试fetch</Button>
        </div>
        <List
          header={<div onClick={this.getError}>Header</div>}
          footer={<div onClick={this.publicTopic}>Footer</div>}
          bordered
          dataSource={list}
          renderItem={item => <Item onClick={() => this.handleClick(item)}>{item.title}</Item>}
        />
        <div className="">
          <Button onClick={this.getPost}>测试detail</Button>
        </div>
      </div>
    )
  }
}

export default Demo5;