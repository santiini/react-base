import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todoReducers from './todoReducers';
import userReducers from './userReducers';
import commonReducers from './commonState';

// immutable
import PostReducers from './Immutable/Post';

// reselect
import shoppingReducers from './Reselect/shoppingCar';

const rootReducers = combineReducers({
  routing: routerReducer,
  todos: todoReducers,
  users: userReducers,
  common: commonReducers,
  posts: PostReducers,
  shopping: shoppingReducers,
});

export const router = routerReducer;
export default rootReducers;