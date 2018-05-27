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
const cSelector = (_, props) => props.c;

// 结合基础数据，返回 props 的纯函数;

const getFoodList = createSelector(
  foodSelector,
  (food) => {
    return food.get('list');
  },
);

const getTotal = createSelector(
  [foodSelector],
  (food) => food.get('total'),
  // (food) => food.get('list').size,
);

// export default getFoodList;

const mapStateToProps = (state, props) => ({
  food: getFoodList(state, props),
  total: getTotal(state, props),
  loading: state.food.get('isRequesting'),
});

// const mapPropsToProps = ({
//   fetch: foodActions.fetch,
// });

export default connect(mapStateToProps)(ImmutableReselect);
