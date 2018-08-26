import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import styles from './Table.scss';
import PatientCensusRow from "./PatientCensusRow/PatientCensusRow";

@connect()
export default class Table extends Component {
    static propTypes = {
        type: PropTypes.string,
        tableLabels: ImmutablePropTypes.list,
        tableItems: ImmutablePropTypes.list,
        width: PropTypes.string,
        backgroundColor: PropTypes.string,
        rowUnexpandedHeight: PropTypes.string,
    }

    constructor(props) {
        super(props)
    }

    tableLabelChevron(sort) {
        if (sort === 'asc') {
            return <i className={"fas fa-chevron-up"}/>
        }
        if (sort == 'dsc') {
            return <i className={"fas fa-chevron-down"}/>
        }
        if (!sort) {
            return null
        }
    }

    renderTableLabel(label, key) {

        let labelStyle = {};
        if (label.get('labelWidth')) {
            labelStyle['width'] = label.get('labelWidth')
        }
        if (label.get('labelJustifyContent')) {
            labelStyle['justifyContent'] = label.get('labelJustifyContent')
        }

        return (
            <div className={"__table-label"} key={key} style={labelStyle}>
                <div className={"__label-text"}>
                    {label.get('labelText')}
                </div>
                <div className={"__label-chevron"}>
                    {
                        this.tableLabelChevron(label.get('sort'))
                    }
                </div>
            </div>
        )
    }

    renderTableRow(row, key) {
        const { type, rowUnexpandedHeight, tableLabels } = this.props;
        if (type === 'patientCensus') {
            return <PatientCensusRow key={key} item={row} unexpandedHeight={rowUnexpandedHeight} tableLabels={tableLabels}/>
        }
    }

    render() {
        const { tableLabels, tableItems, width, backgroundColor, tableSortLabel, tableSortDirection } = this.props;

        let tableStyle = {};

        if (width) {
            tableStyle['width'] = width;
            tableStyle['backgroundColor'] = backgroundColor;
        }



        return(
            <div className={"Table"} style={tableStyle}>
                <div className={"__table-labels"}>
                    <div className={"__table-label-spacer"}/>
                    {
                        tableLabels.map((label, key) => this.renderTableLabel(label, key))
                    }
                    <div className={"__table-label-spacer"}/>
                </div>
                <div className={"__table-rows"}>
                    {
                        tableItems.map((row, key) => this.renderTableRow(row, key))
                    }
                </div>
            </div>
        )
    }
}
