/**
 * Immutable-reselect 的介绍
 */
/* eslint-disable no-unused-var */
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import ImmutableReselect from './index';
import * as foodActions from '@/actions/Immu/food';

// 基础 state
const foodSelector = (state) => state.food;

// Selector 的参数: 1. state, 来自 redux; 2. props, 来自 component 组件
const abSelector = (state, props) => state.a * props.b;
const titleSelector = (_, props) => props.title;
// props.length 决定了 state.food.list 的实际长度
const lengthSelector = (state, props) => props.length && _.min([props.length, state.food.get('list').size]);

// 结合基础数据，返回 props 的纯函数;
const getFoodList = createSelector(
  foodSelector,
  lengthSelector,
  // state 和 props 共同决定了组件的数据获取
  (food, length) => {
    console.log(length)
    return food.get('list').slice(0, length);
  },
);

const getTotal = createSelector(
  [foodSelector],
  (food) => food.get('total'),
  // (food) => food.get('list').size,
);

const getLoading = createSelector(
  foodSelector,
  (food) => food.get('isRequesting'),
);

const getTitle = createSelector(
  titleSelector,
  (title) => title,
);

// export default getFoodList;

const mapStateToProps = (state, props) => ({
  food: getFoodList(state, props),
  total: getTotal(state, props),
  loading: getLoading(state, props),
  title: getTitle(state, props),
});

// const mapPropsToProps = ({
//   fetch: foodActions.fetch,
// });

export default connect(mapStateToProps)(ImmutableReselect);
