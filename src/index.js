import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
// import App from './views/demo1/Demo1';
import App from './App';
// import store from './state/state';
// import store from './redux/store'
import configStore from './reducers/configStore';

import registerServiceWorker from './registerServiceWorker';

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