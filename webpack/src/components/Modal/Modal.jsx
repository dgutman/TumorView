import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import styles from './Modal.scss';
import * as ActionTypes from '../../actions/index';

import LoginModal from './LoginModal/LoginModal';

@connect()
class Modal extends Component {
  static propTypes = {
    viewable: PropTypes.bool,
    modalType: PropTypes.string,
    loginErrors: ImmutablePropTypes.map,
    loggedOn: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.body = document.getElementsByTagName("body");
    this.state = {
      scrollY: window.scrollY,
      scrollX: window.scrollX
    }
  }

  returnModalContent() {
    const { modalType, loginErrors, loggedOn } = this.props;
    if (modalType === "login") {
      return <LoginModal loginErrors={loginErrors} loggedOn={loggedOn}/>
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", (e) => {
      this.setState({
        scrollY: window.scrollY,
        scrollX: window.scrollX
      })
    })
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    if (this.overlay) {
      this.overlay.addEventListener("click", (e) => {
        if (this.overlay.contains(e.target)) {
          dispatch({type: ActionTypes.TOGGLE_MODAL, modalType: null})
        }
      })
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    window.removeEventListener("scroll", null)
    if (this.overlay) {
      this.overlay.removeEventListener("click", (e) => {
        if (this.overlay.contains(e.target)) {
          dispatch({type: ActionTypes.TOGGLE_MODAL, modalType: null})
        }
      })
    }
  }

  render() {
    const { viewable } = this.props;
    const { scrollX, scrollY } = this.state;

    let modalContainerStyle = {
      top: scrollY,
      left: scrollX
    }

    return (
      <div style={modalContainerStyle} className={viewable? "Modal _display" : "Modal"}>
        {viewable && <div ref={(overlay) => this.overlay = overlay} className={"__overlay"}/> }
        { this.returnModalContent.bind(this)() }
      </div>
    )
  }
}

export default Modal
