import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import routes from "./routes";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {transitions, positions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const alertsOptions = {
    position: positions.TOP_RIGHT,
    timeout: 3000,
    offset: '30px',
    transition: transitions.SCALE
}

ReactDOM.render(
    <React.StrictMode>
        <AlertProvider template={AlertTemplate} {...alertsOptions}>
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </AlertProvider>
    </React.StrictMode>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
