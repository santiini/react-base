import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import { initialState } from './reducers'
import reducers from './reducers';

// 创建 store;
const store = createStore(
  reducers,
  // initialState,
  applyMiddleware(thunk),
);

export default store;