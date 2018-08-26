import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";

import modal from './Modal/modal';
import login from './Login/login';
import sideMenu from './SideMenu/sideMenu';
import keys from './Keys/keys';


export const reducers = combineReducers({
    router: routerReducer,
    keys,
    modal,
    login,
    sideMenu
});
