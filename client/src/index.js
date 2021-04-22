import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import store from "./reducers";
import {Provider} from "react-redux";
import TokenService from './services/TokenService'

TokenService.subscribe((data) => data)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


