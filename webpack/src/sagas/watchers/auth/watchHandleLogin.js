import {call, fork, put, take} from 'redux-saga/effects';
import * as ActionTypes from '../../../actions/index';
import SecurusScriptum from '../../../api/SecurusScriptum';
import { fromJS, List } from 'immutable';

let api = new SecurusScriptum();

export default function* watchHandleLogin() {
  while(true) {
    const loginAction = yield take(ActionTypes.HANDLE_LOGIN);
    if (loginAction.email && loginAction.password) {
      const postData = {
        email: loginAction.email,
        password: loginAction.password
      }
      const apiResposne = yield api.handlePostRequest('api/auth/login', postData)
      const apiResponseImmutable = fromJS(apiResposne)
      if (apiResponseImmutable.get('loggedOn')) {
        const putLoginResult = yield put(
          {
            type: ActionTypes.LOGIN_SUCCESSFUL,
            user:apiResponseImmutable.get('user')
          })
        const putToggleModalResult = yield put({
          type: ActionTypes. TOGGLE_MODAL,
          modalType: null
        })
      } else {
        let loginErrors = apiResponseImmutable.get("loginErrors")
        if (loginErrors.size > 0) {
          const putError = yield put(
            {
              type: ActionTypes.LOGIN_UNSUCCESSFUL,
              errors: loginErrors
            }
          )
        } else {
          const putError = yield put({
            type: ActionTypes.LOGIN_UNSUCCESSFUL,
            errors: loginErrors
          })
        }
      }
    }
  }

}
