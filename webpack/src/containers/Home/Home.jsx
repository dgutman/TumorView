import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PapayaExpanded from '../../components/PapayaExpanded/PapayaExpanded'

const mapStateToProps = (state) => {
  return {
    user: state.login.get("user"),
    viewable: state.modal.get("viewable"),
    modalType: state.modal.get("type"),
    loginErrors: state.login.get("errors"),
    loggedOn: state.login.get("loggedOn"),
    viewSideMenu: state.sideMenu.get("viewSideMenu")
  }
}

@connect(mapStateToProps)
class Home extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
  }

  render() {

    const { loggedOn, user, viewSideMenu, loginErrors, viewable, modalType } = this.props;

    return (
      <div className="Container">
        <Header loggedOn={loggedOn}/>
        <PapayaExpanded/>
        <Footer/>
      </div>
    )
  }
}

export default Home
