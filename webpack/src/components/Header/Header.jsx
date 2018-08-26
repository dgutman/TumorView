import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as ActionTypes from '../../actions/index';
import { List, Map } from 'immutable';

import styles from './Header.scss';
import Dropdown from "../Common/Dropdown/Dropdown";

@connect()
class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedOn: PropTypes.bool
  }

  handleLoginClick() {
    const { dispatch } = this.props;

    dispatch({
      type: ActionTypes.TOGGLE_MODAL,
      modalType: "login"
    })
  }

  handleLogoutClick() {
    const { dispatch } = this.props;

    dispatch({
      type: ActionTypes.HANDLE_LOGOUT,
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      userDropdownVisible: false
    }
  }

  handleMenuButtonClick() {
    const { dispatch } = this.props;
    dispatch({
      type: ActionTypes.TOGGLE_SIDE_MENU
    })
  }

  render() {
    const { loggedOn } = this.props;

    const dropdownItems = List([
      loggedOn ? Map({
        name: "Logout",
        onClick: this.handleLogoutClick.bind(this)
      }) : Map({
        name: "Logon",
        onClick: this.handleLoginClick.bind(this)
      })
    ])

    return (
      <header className="Header">
        <div className={"__left"}>
          <h1>Tumor View</h1>
        </div>
          <div className={"__middle"}>
          </div>
        <div className={"__right"}>
          <button className={"__config"}>
            <i className={"fas fa-cog"}/>
          </button>
        </div>
      </header>
    )
  }
}

export default Header
