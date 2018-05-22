import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import reducers from './rootReducers';
// import { initialState as todos } from './todoReducers';
// import { initialState as users } from './userReducers';
// import { router as routing } from './rootReducers';
import { history } from '../App';

const middleware = routerMiddleware(history);
const middlewares = [thunk, middleware];
// let state = {
//   // name: 'santiiny',
//   // address: '海淀',
//   todos,
//   users,
//   routing,s
// };

// 生产环境;
let composeMiddle = compose(applyMiddleware(...middlewares));

// 开发环境;
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
  console.warn('development !!!')
  composeMiddle = composeWithDevTools(
    applyMiddleware(...middlewares)
  );
  // if (window.devToolsExtension) {
  //   devToolsExtension = window.devToolsExtension();
  // }
}

export default (initialState) => {
  // compose 组合中间件
  const store = createStore(reducers, initialState, composeMiddle);
  return store;
}