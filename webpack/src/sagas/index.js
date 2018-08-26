import { fork, call } from 'redux-saga/effects';

// window.openpgp.initWorker({path: 'js/openpgp/dist/openpgp.worker.js'})

import checkLoginStatus from './checkers/checkLoginStatus';
import watchHandleLogin from './watchers/auth/watchHandleLogin';
import watchHandleLogout from './watchers/auth/watchHandleLogout';

export function* sagas() {
  // yield call(checkLoginStatus),
  yield fork(watchHandleLogin),
  yield fork(watchHandleLogout);
}


export default sagas
