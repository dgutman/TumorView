import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import styles from './RoomLabels.scss';

@connect()
export default class RoomLabels extends Component {
    static propTypes = {
        tableLabels: ImmutablePropTypes.list
    }

    render() {

        return(
            <div className={"RoomLabels"}>
            </div>
        )
    }
}
