# 项目需要学习

## 搭建和部署学习

### nginx 在项目中的本地化配置

## 新的技术栈

### 1. react-router-redux

这是一个类似 vue 中 vuex-router-sync 的库，把 router 的变化反应到 redux 中。

实现功能:
1. 在 redux 中访问 react-router 信息;
2. 通过 dispath({ }) 方式实现 router 的跳转;

```js
  import { push } from 'react-router-redux'

  // ...
  dispatch(push(link))
```

参考: https://segmentfault.com/q/1010000009915292

### 2. lodash 库的使用

### 3. async -- nodeJS的 异步库

参考: http://caolan.github.io/async/

### 4. classNames

```js
  classNames({ foo: true, bar: true }); // => 'foo bar'
```

## 代码风格转换

## 代码的模块化

### reducers 的拆分：模块化

```js
  // 1. createReducer.js 定义拆分函数:
  export default function(intialState, handlers) {
    return (state = intialState, action) => {
      const handler = handlers[action.type];
      if (!handler) {
        return state;
      }
      return handler(state, action);
    }
  }

  // 2. 在相关模块 createReducer
  import createReducer from '../util/createReducer'

  const initialState = {
    results: null,
    fetchPending: false,
    fetchSuccessed: false,
    fetchError: null,
  }

  export default createReducer(initialState, {
    ['FETCH_RESULTS_REQUEST'](state, action) {
      return {
        ...state,
        fetchPending: true,
        fetchSuccessed: false,
        fetchError: null,
      }
    },
    ['FETCH_RESULTS_SUCCESS'](state, action) {
      return {
        ...state,
        fetchPending: false,
        fetchSuccessed: true,
        fetchError: null,
        results: action.payload.data,
      }
    },
    ['FETCH_RESULTS_FAILURE'](state, action) {
      return {
        ...state,
        fetchPending: false,
        fetchSuccessed: false,
        fetchError: action.payload.error,
      }
    },
  })

  // 3. index.js 组合reducers
  import { combineReducers } from 'redux';
  import { routerReducer as routing } from 'react-router-redux'
  import session from './session'
  import campaign from './campaign'
  import results from './results'
  import contents from './contents'
  import kol from './kol'

  export default  combineReducers({
    routing,  // routerReducer 把 react-router 加入到 redux 中;
    session,
    campaign,
    results,
    contents,
    kol
  })

  // 4. configStore.js 中调用 createStore, 组合 
  import { createStore, applyMiddleware, compose } from 'redux';
  import thunk from 'redux-thunk';
  import rootReducer from './rootReducer';

  const middlewares = [thunk];
  let devToolsExtension = f => f;

  /* istanbul ignore if  */
  if (process.env.NODE_ENV === 'dev') {
    const createLogger = require('redux-logger');

    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);

    if (window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }
  }

  export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middlewares),
      devToolsExtension
    ));
    return store;
  }

  // 5. 在 index.js 中导入 store
  import configureStore from './common/configStore'
  import routes from './routes'

  const store = configureStore()
  const history = syncHistoryWithStore(browserHistory, store)

  const root = document.getElementById('root')

  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    root
  )
```

#### redux-actions: 实现 reducer 的拆分

```js
  function createReducer(initialState, handlers) {
      return function reducer(state = initialState, action) {
          if (handlers.hasOwnProperty(action.type)) {
              return handlers[action.type](state, action)
          } else {
              return state
          }
      }
  }

  const todosreducer = createReducer([], {
      'ADD_TODO': addTodo,
      'TOGGLE_TODO': toggleTodo,
      'EDIT_TODO': editTodo
  });
```

### api 的拆分: axios 库的使用

在 client 项目中:

```js
  // api.js: 定义初始化方法
  import axios from 'axios'

  const api = {}
  const init = () => {
    if(!localStorage.getItem('access_token')) {
      return Error('has no access_token')
    }
    api.instance = axios.create({
      baseURL: '/api_kol',
      headers: {
        'x-auth-token': localStorage.getItem('access_token'),
        'content-type': 'application/json',
      }
    })
    api.social = axios.create({
      baseURL: '/api_v3',
      headers: {
        'x-auth-token': localStorage.getItem('access_token'),
        'content-type': 'application/json',
      }
    })
  }

  api.init = init

  export default api

  // App.js: 在 componentWillMount 中执行 init 方法

  class App extends Component {
    componentWillMount() {
      api.init(); // 执行初始化
    }
  }
```

在 admin 项目中:

```js
  // 在 api.js 中: 更详细的分类
  import axios from 'axios'

  const socialApi = axios.create({
    baseURL: '/api_v3',
    timeout: 80000,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('access_token')
    }
  })

  const baseApi = axios.create({
    baseURL: '/api_kol',
    timeout: 80000,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('access_token')
    }
  })

  function apiGenerator(base, url) {
    return {
      get: (params) => base(url, {params}),
      getAll: (params) => base(url, {params}),
      save: (data) => base(url, {method: 'post', data}),
      update: (data, options) => {
        const Url = `${url}/${options.id}`
        return base(url, {method: 'put', data, url: Url})
      },
      remove: (options) => {
        const removeUrl = `${url}/${options.id}`
        return base(url, {method: 'delete', url: removeUrl})
      }
    }
  }

  function socialApiGenerator(base, url) {
    return {
      get: (params) => base(url, {params}),
      getAll: (params) => base(url, {params}),
      save: (data) => base(url, {method: 'post', data}),
      update: (data, options) => {
        const Url = `${url}/${options.id}`
        return base(url, {method: 'put', data, url: Url})
      },
      remove: (options) => {
        const removeUrl = `${url}/${options.id}`
        return base(url, {method: 'delete', url: removeUrl})
      }
    }
  }

  export const session = socialApiGenerator(socialApi, '/session')
  export const team = socialApiGenerator(socialApi, '/teams')
  export const user = socialApiGenerator(socialApi, '/users')
  export const project = ((base) => {
    return {
      getAll: (params, options) => base(`/teams/${options.teamId}/campaigns`, {params}),
      save: (data, options) => base(`/teams/${options.teamId}/campaigns`, {method: 'post', data}),
      remove: (options) => base(`/campaigns/${options.projectId}`, {method: 'delete'}),
      upload: (data, options) => base(`/campaigns/${options.campaignId}/import`, {method: 'post', data: data.data})
    }
  })(baseApi)
  export const employee = ((base) => {
    return {
      getAll: (params, options) => base(`/teams/${options.teamId}/employees`, {params}),
      save: (data, options) => base(`/teams/${options.teamId}/employees`, {method: 'post', data}),
      remove: (options) => base(`/employees/${options.employeeId}`, {method: 'delete'}),
    }
  })(socialApi)

  export const stats = ((base) => {
    return {
      get: () => base(`/stats`),
    }
  })(baseApi)

  export const log = ((base) => {
    return {
      get: (params) => base(`/logs`, {params}),
    }
  })(baseApi)

  export { socialApi }

  // 在 request 中定义初始化
  import axios from 'axios'

  let request = {}
  const apiInit = () => {
    if(!localStorage.getItem('access_token')) {
      return Error('has no access_token')
    }
    request.api = axios.create({
      baseURL: '/api_kol',
      timeout: '10000',
      headers: {
        'x-auth-token': localStorage.getItem('access_token'),
        'content-type': 'application/json',
      }
    })
  }
  request.apiInit = apiInit
  export default request


  // 在 App.js 中， componentWillMount 中执行初始化
  class App extends Component {
    componentWillMount() {
      request.apiInit(); // 执行初始化
    }
  }

```