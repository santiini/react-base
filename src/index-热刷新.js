import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const render = Component => {
  // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

// ReactDOM.render(<App />, document.getElementById('root'));

render(App);

// 热刷新
if (module.hot) {
  const orgError = console.error;
  console.error = (...args) => {
    if (args && args.length === 1 && typeof args[0] === 'string' 
      && args[0].indexOf('You cannot change <Router routes>;') > -1)
      {
        // React route changed
      } else {
        // Log the error as normally
        orgError.apply(console, args);
      }
  };

  module.hot.accept('./App', () => {
    render(App);
  });
}

registerServiceWorker();