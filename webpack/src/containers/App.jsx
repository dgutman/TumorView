import React, { Component } from 'react';
import style from '../stylesheets/main.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Header from '../components/Header/Header';
import Footer from "../components/Footer/Footer";

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
class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    viewable: PropTypes.bool,
    modalType: PropTypes.string,
    loginErrors: ImmutablePropTypes.map,
    loggedOn: PropTypes.bool,
    viewSideMenu: PropTypes.bool,
    user: ImmutablePropTypes.map
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { viewable, modalType, loginErrors, user, loggedOn, viewSideMenu } = this.props;
    return (
      <div className="Container">
        <Header loggedOn={loggedOn}/>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}

export default App
