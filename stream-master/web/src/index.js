import React from 'react';
import ReactDOM from 'react-dom';
import "./css/app.css";
import App from "./components/app";
import {Router} from "react-router-dom";
import {history} from "./history";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router history={history}><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
