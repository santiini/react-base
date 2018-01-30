import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
// import App from './views/demo1/Demo1';
import App from './App';
import store from './redux/store'

import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
