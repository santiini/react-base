import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todoReducers from './todoReducers';
import userReducers from './userReducers';
import commonReducers from './commonState';

const rootReducers = combineReducers({
  routing: routerReducer,
  todos: todoReducers,
  users: userReducers,
  common: commonReducers,
});

export const router = routerReducer;
export default rootReducers;