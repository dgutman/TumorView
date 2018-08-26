import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';

const mapStateToProps = (state) => {
    return {
    }
}

@connect(mapStateToProps)
class Papaya extends Component {
    static propTypes = {
    }

    constructor(props) {
        super(props)
    }

    render() {

        const { loggedOn, user, viewSideMenu, loginErrors, viewable, modalType } = this.props;

        return (
            <div className="papaya" data-params="params">
            </div>
        )
    }
}

export default Papaya
