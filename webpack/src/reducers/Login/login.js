import * as ActionTypes from '../../actions/index';
import { Map, List } from 'immutable';

const initialState = Map({
  loggedOn: false,
  user: null,
  errors: null
})

function login(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.CLEAR_PASSWORD_ERROR:
      return state.update("errors", (errors) => errors && errors.update("password", () => null))
    case ActionTypes.CLEAR_EMAIL_ERROR:
      return state.update("errors", (errors) => errors && errors.update("email", () => null))
    case ActionTypes.LOGOUT_UNSUCCESSFUL:
      return state.update("errors", () => action.errors)
    case ActionTypes.LOGIN_UNSUCCESSFUL:
      return state.update("loggedOn", () => false)
        .update("user", () => null)
        .update("errors", () => action.errors)
    case ActionTypes.LOGOUT_SUCCESSFUL:
      return state.update("loggedOn", () => false)
        .update("user", () => null)
        .update("errors", () => null)
    case ActionTypes.LOGIN_SUCCESSFUL:
      return state.update("loggedOn", () => true)
        .update("user", () => action.user)
        .update("errors", () => null)
    default:
      return state
  }
}

export default login
