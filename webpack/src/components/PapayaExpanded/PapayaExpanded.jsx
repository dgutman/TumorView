import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Papaya from "../Papaya/Papaya";

import styles from './PapayaExpanded.scss';

const mapStateToProps = (state) => {
    return {
    }
}

@connect(mapStateToProps)
class PapayaExpanded extends Component {
    static propTypes = {
    }

    constructor(props) {
        super(props)
    }

    render() {

        const { loggedOn, user, viewSideMenu, loginErrors, viewable, modalType } = this.props;

        return (
            <div className={"PapayaExpanded"}>
                <div className={"__papaya-viewer"}>
                    <Papaya/>
                </div>
                <div className={"__additional-controls"}>

                </div>
                <div className={"__directory-browser"}>

                </div>
            </div>
        )
    }
}

export default PapayaExpanded
