import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { List } from 'immutable';

import ValidationHelper from '../../../helpers/ValidationHelper';
import * as ActionTypes from '../../../actions/index';
import styles from './LoginModal.scss';

let validator = new ValidationHelper();

@connect()
class LoginModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loginErrors: ImmutablePropTypes.map,
    loggedOn: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      emailValidationReady: false,
      passwordValidationErrors: false,
      emailValidationErrors: null,
      passwordValidationReady: null
    }
  }

  determineLoginButtonDisabled() {
    const { emailValidationReady, passwordValidationReady} = this.state;
    if (passwordValidationReady && emailValidationReady) {
      return false
    } else {
      return true
    }
  }

  determineLoginButtonClass() {
    const { emailValidationReady, passwordValidationReady} = this.state;
    if (emailValidationReady && passwordValidationReady) {
      return "__button"
    } else {
      return "__button _disabled"
    }
  }

  determineEmailInputClass() {
    const { emailValidationErrors, emailValidationReady } = this.state;
    const { loginErrors } = this.props;
    if (loginErrors&& loginErrors.get("email")) {
      return "__input-text _error"
    } else if (emailValidationReady) {
      return "__input-text _ready"
    } else if (emailValidationErrors) {
      return "__input-text _error"
    } else {
      return "__input-text"
    }
  }

  determinePasswordInputClass() {
    const { passwordValidationErrors, passwordValidationReady } = this.state;
    const { loginErrors } = this.props;
    if (loginErrors && loginErrors.get("password")) {
      return "__input-text _error"
    } else if (passwordValidationReady) {
      return "__input-text _ready"
    } else if (passwordValidationErrors) {
      return "__input-text _error"
    } else {
      return "__input-text"
    }
  }

  handleLoginButtonClick() {
    const { dispatch } = this.props;
    dispatch({
      type: ActionTypes.HANDLE_LOGIN,
      email: this.emailInput.value,
      password: this.passwordInput.value
    })
  }

  validateEmail() {
    const { dispatch } = this.props;

    let result = validator.validateEmail(this.emailInput.value)
    if (!result) {
      this.setState({
        emailValidationErrors: List(["E-mail must be the appropriate format"]),
        emailValidationReady: false
      })
      dispatch({type: ActionTypes.CLEAR_EMAIL_ERROR})
    } else {
      this.setState({
        emailValidationErrors: null,
        emailValidationReady: true
      })
      dispatch({type: ActionTypes.CLEAR_EMAIL_ERROR})
    }
  }

  validatePassword() {
    const { dispatch } = this.props;

    let result = validator.validatePassword(this.passwordInput.value)
    if (!result) {
      this.setState({
        passwordValidationErrors: List(["Password empty"]),
        passwordValidationReady: false
      })
      dispatch({type: ActionTypes.CLEAR_PASSWORD_ERROR})
    } else {
      this.setState({
        passwordValidationErrors: null,
        passwordValidationReady: true
      })
      dispatch({type: ActionTypes.CLEAR_PASSWORD_ERROR})
    }
  }

  render() {
    const { emailValidationErrors, passwordValidationErrors } = this.state;
    const { loginErrors } = this.props;

    return (
      <div className={"LoginModal"}>
        <div className={"__modal-top"}>
          <h1>LOGIN</h1>
        </div>
        <div className={"__modal-middle"}>
          <div className={"__input"}>
            { emailValidationErrors && emailValidationErrors.map((error, key) => <div className={"__error"} key={key}>{error}</div> ) }
            { loginErrors && loginErrors.get("email") && <div className={"__error"}>{loginErrors.get("email") }</div> }
            <label>E-mail</label>
            <input onChange={this.validateEmail.bind(this)} className={this.determineEmailInputClass.bind(this)()} ref={(emailInput) => this.emailInput = emailInput} type={"text"}/>
          </div>
          <div className={"__input"}>
            { passwordValidationErrors && passwordValidationErrors.map((error, key) => <div className={"__error"} key={key}>{error}</div> ) }
            { loginErrors && loginErrors.get("password") && <div className={"__error"}>{loginErrors.get("password") }</div> }
            <label>Password</label>
            <input onChange={this.validatePassword.bind(this)} className={this.determinePasswordInputClass.bind(this)()} ref={(passwordInput) => this.passwordInput = passwordInput} type={"password"}/>
          </div>
        </div>
        <div className={"__modal-bottom"}>
          <button disabled={this.determineLoginButtonDisabled.bind(this)()} onClick={this.handleLoginButtonClick.bind(this)} className={this.determineLoginButtonClass.bind(this)()} type={"button"}>LOGIN</button>
        </div>
      </div>
    )
  }
}

export default LoginModal
