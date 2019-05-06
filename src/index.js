import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import Alert from 'react-s-alert';
import Axios from 'axios';
const server_url = 'http://localhost:3030'
Axios.interceptors.request.use(function (config) {
    config.url = [server_url, config.url].join('/')
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

window.alert = message => {
    Alert.info(message, {
        position: 'top-right',
        effect: 'jelly',
        timeout: 5000,
    });
}

window.error = message => {
    Alert.error(message, {
        timeout: 5000,
        position: 'top-right',
        effect: 'jelly',
    });
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
