import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { whyDidYouUpdate } from 'why-did-you-update';

import './index.css';
// import App from './views/demo1/Demo1';
import App from './App'; // 正常的 admin 列表
// import App from './router/RouterMap'; // react-loadable 的测试
// import store from './state/state';
// import store from './redux/store'
import configStore from './reducers/configStore';

import registerServiceWorker from './registerServiceWorker';

// 检测 React 的 re-render;
if (process.env.NODE_ENV !== 'production') {
  // whyDidYouUpdate(React);
  whyDidYouUpdate(React, {
    // include: ,
    exclude: [/^SubMenu/, /^ProxyComponent/],
  });
}

// ReactDOM.render(<App />, document.getElementById('root'));
const store = configStore();
const renderFunc = Component => {
  // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
  render(
    <AppContainer>
      <Provider store={store}>
        <Component store={store} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderFunc(App);

// 热刷新
// if (module.hot) {
//   const orgError = console.error;
//   console.error = (...args) => {
//     if (args && args.length === 1 && typeof args[0] === 'string'
//       && args[0].indexOf('You cannot change <Router routes>;') > -1) {
//       // React route changed
//     } else {
//       // Log the error as normally
//       orgError.apply(console, args);
//     }
//   };

//   module.hot.accept('./App', () => {
//     renderFunc(App);
//   });
// }


// 2. 刷新方式2 - 简单的刷新
// if (module.hot) {  
//   module.hot.accept()  
// }

registerServiceWorker();