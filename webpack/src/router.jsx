import React from "react";
import {Router, Route} from "react-router";
import { ConnectedRouter } from 'react-router-redux';
import {history} from "./store.js";

import App from './containers/App';

import Home from './containers/Home/Home';

const router = (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        <div>
            <Route exact path={"/"} component={Home}/>
        </div>
    </Router>
);

export {router};
