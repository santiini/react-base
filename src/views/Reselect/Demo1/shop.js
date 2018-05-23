/**
 * reselect 的使用
 */
import { createSelector } from 'reselect';

const shopItemsSelector = (state) => state.shopping.items;

const taxPercentSelector = (state) => state.shopping.taxPercent;

const subtotalSelector = createSelector(
  shopItemsSelector,
  (items) => items.reducer((acc, item) => acc + item.value, 0)
);

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
);

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax }),
);

let shoppingState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', vlaue: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
};
