import { take, put, call, fork } from 'redux-saga/effects';
import * as ActionTypes from '../../../actions/index';
import SecurusScriptum from '../../../api/SecurusScriptum';

let api = new SecurusScriptum()

export default function* watchHandleLogout () {
  while(true) {
    const logoutAction = yield take(ActionTypes.HANDLE_LOGOUT);
  }
}
