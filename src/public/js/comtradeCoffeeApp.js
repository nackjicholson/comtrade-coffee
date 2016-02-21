import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createAppStore from '../../app/redux/createAppStore';
import rootReducer from '../../app/redux/modules/root';
import App from '../../app/containers/App';

const store = createAppStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('comtrade-coffee-app')
);
