/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Button, Tabs } from 'antd';
import PropTypes from 'prop-types';

import './learn.styl';

const { TabPane } = Tabs;

/* 
  1. BFC-块级格式化上下文
  Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。
  它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
  BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。
  具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
  通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

  1.1 触发 BFC
  只要元素满足下面任一条件即可触发 BFC 特性：
    - 只要元素满足下面任一条件即可触发 BFC 特性：
    - 浮动元素：float 除 none 以外的值
    - 绝对定位元素：position (absolute、fixed)
    - display 为 inline-block、table-cells、flex
    - overflow 除了 visible 以外的值 (hidden、auto、scroll)

  1.2 BFC特性和应用

   - 同一个 BFC 下外边距会发生折叠
   - BFC 可以包含浮动的元素（清除浮动）
   - BFC 可以阻止元素被浮动元素覆盖
*/
export default class Learn3 extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="BFC-块级格式化上下文" key="1">
            <h5>1. 同一个 BFC 下外边距会发生折叠</h5>
            <div className="bfc-container">
              <div className="bfc-child" />
              <div className="bfc-child" />
            </div>
            <h5>2. 不同的 BFC 容器中。</h5>
            <div className="bfc-box">
              <p>1</p>
            </div>
            <div className="bfc-box">
              <p>2</p>
            </div>
            <h5>3. BFC 可以包含浮动的元素（没有包裹浮动)</h5>
            <div>
              <div>11111</div>
              <div className="bfc-float" />
            </div>
            <h5>3.2 BFC 可以包含浮动的元素（父元素清除浮动)</h5>
            <div className="bfc-box">
              <div>11111</div>
              <div className="bfc-float" />
            </div>
            <h5>4. BFC 可以阻止元素被浮动元素覆盖</h5>
            <div>
              <div>
                <div className="bfc-float" />
                <div className="bfc-text" />
              </div>
            </div>
            <h5>4.2. BFC 可以阻止元素被浮动元素覆盖</h5>
            <div>
              <div>
                <div className="bfc-float" />
                <div className="bfc-text hidden" />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}