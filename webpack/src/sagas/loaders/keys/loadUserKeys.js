import { call, fork, put} from 'redux-saga/effects';
import SecurusScriptum from '../../../api/SecurusScriptum';
import { fromJS } from 'immutable';
import * as ActionTypes from '../../../actions/index';

let api = new SecurusScriptum();

export default function* checkLoginStatus () {
  const apiGetUserKeysResponse = yield api.handleGetRequest('api/user/keys');
  const apiLoginCheckResponseImmutable = fromJS(apiGetUserKeysResponse);
  if (apiLoginCheckResponseImmutable.get('loggedOn')) {
    const putLoggedIn = yield put({type: ActionTypes.LOGIN_SUCCESSFUL, user: apiLoginCheckResponseImmutable.get('user')})
  }
}
