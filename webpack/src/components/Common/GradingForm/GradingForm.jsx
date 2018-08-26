import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import styles from './Selector.scss';

@connect()
export default class Selector extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
    }

    render() {
        return(
            <div className={"GradingForm"}>
            </div>
        )
    }
}
