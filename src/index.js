import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.scss';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import thunk from 'redux-thunk';
import ApplicationPage from './pages/application/page/applicationPage';
import rootReducer from './redux/reducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ApplicationPage />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
