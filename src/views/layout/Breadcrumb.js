import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

class Breadlist extends Component {
  static contextTypes = {
    routeData: PropTypes.object,
    routes: PropTypes.array,
  }
  
  // 渲染子节点
  itemRender = (route, params, routes, paths) => {
    const { linkElement = 'a' } = this.props;
    const last = routes.indexOf(route) === routes.length - 1;

    return (
      last || !route.component
      ? <span>{route.name}</span>
      : createElement(linkElement, {
        href: paths.join('/') || '/',
        to: paths.join('/') || '/',
      }, route.name)
    )
  }

  // 待补全
  render() {
    // const { routes } = this.context;
    const routes = [{
      path: 'index',
      name: '首页'
    }, {
      path: 'first',
      name: '一级面包屑'
    }, {
      path: 'second',
      name: '当前页面'
    }];
    return (
      <Breadcrumb
        style={{margin: '10px 16px 0'}}
        itemRender={this.itemRender}
        routes={routes}
      />
    )
  }
}

export default Breadlist;