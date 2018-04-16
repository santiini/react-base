import React, { Component } from 'react';
import { Spin } from 'antd';

export default class UserList extends Component {

  state = {
    username: '....',
    loading: false,
  }

  componentWillMount() {
    this.setState({ loading: true})
  }

  componentDidMount() {
    console.log('mount');
    setTimeout(() => {
      this.setState({ username: 'sunxt', loading: false })
    }, 3000)
  }

  // 不能是异步函数，可以 setState
  componentWillReceiveProps(nextProps) {
    // console.log('will receive')
    // console.log(nextProps.match.params.id)
    // console.log(this.props.match.params.id)
    // if (this.props.match.params.id !== nextProps.match.params.id) {
    //   this.setState({ username: 'sunxt'})
    // }
    console.log('改变state')
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({ loading: true})
    }
  }

  // 可以是异步请求函数, this.setState 会导致组件更新， 再次进入 componentDidUpdate, 需要一个判断更新的条件: prevProps
  componentDidUpdate(prevProps) {
    // console.log('did update')
    // console.log(this.props.match.params.id)
    // console.log(prevProps.match.params.id)
    // console.log('获取数据');
    if (this.props.match.params.id !== prevProps.match.params.id) {
      setTimeout(() => {
        this.setState({ username: 'sunxt2222', loading: false })
      }, 3000)
    }
  }

  renderList = (item, i) => {
    const { params: { id }} = this.props.match
    return <div className="" key={i}>{String(id).repeat(i + 1)}</div>
  };

  render() {
    console.log('render 函数');
    return (
      <div className="looks">
        <div className="">
        {
          Array.from({length: 10}).map(this.renderList)
        }
        </div>
        <div className="">
        {
          this.state.loading ? <Spin /> : this.state.username
        }
        </div>
      </div>
    )
  }
}