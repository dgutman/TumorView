import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './Footer.scss';

@connect()
class Footer extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <footer className="Footer">
        <div className={"__content"}>
          <div className={"__left"}>
            <div className={"__logo"}>
              <img/>
            </div>
            <div className={"__site-abbrv"}>
              DL4C
            </div>
          </div>
          <div className={"__middle"}/>
          <div className={"__right"}>
            <div className={"__menu"}>
              <div className={"__menu-item"}>
                <a className={"__menu-item-text"}>
                  About
                </a>
              </div>
              <div className={"__menu-item"}>
                <a className={"__menu-item-text"}>
                  Contact Us
                </a>
              </div>
              <div className={"__menu-item"}>
                <a className={"__menu-item-text"}>
                  @DL4C
                </a>
              </div>
              <div className={"__menu-item"}>
                <a className={"__menu-item-text"}>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
