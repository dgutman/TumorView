import { call, fork, put} from 'redux-saga/effects';
import SecurusScriptum from '../../api/SecurusScriptum';
import { fromJS } from 'immutable';
import * as ActionTypes from '../../actions/index';

let api = new SecurusScriptum();

export default function* checkLoginStatus () {
  const apiLoginCheckResponse = yield api.handleGetRequest('api/auth/login');
  const apiLoginCheckResponseImmutable = fromJS(apiLoginCheckResponse);
  if (apiLoginCheckResponseImmutable.get('loggedOn')) {
    const putLoggedIn = yield put({type: ActionTypes.LOGIN_SUCCESSFUL, user: apiLoginCheckResponseImmutable.get('user')})
  }
}
