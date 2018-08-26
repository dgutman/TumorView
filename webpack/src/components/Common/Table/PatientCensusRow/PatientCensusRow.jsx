import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import styles from './PatientCensusRow.scss';

@connect()
export default class PatientCensusRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }

    static propTypes = {
        tableLabels: ImmutablePropTypes.list,
        item: ImmutablePropTypes.map,
        unexpandedHeight: PropTypes.string
    }

    renderNotices(item) {
        if (item.get('notices') && item.get('notices').get('text')) {
            return (
                <div className={"__notice-text"}>
                    {item.get('notices').get('text')}
                </div>
            )
        }
    }

    renderNoticeIcon(item) {
        let iconStyle = {};

        if (item.get('notices')) {
            if (item.get('notices').get('iconColor') === 'red') {
                iconStyle['color'] = '#F44336';
            }
            if (item.get('notices').get('iconColor') === 'blue') {
                iconStyle['color'] = '#2196F3';
            }
            if (item.get('notices').get('iconColor') === 'yellow') {
                iconStyle['color'] = '#FCBA25';
            }
            if (item.get('notices').get('iconColor') === 'brown') {
                iconStyle['color'] = '#683010';
            }
            if (item.get('notices').get('iconColor') === 'blueGray') {
                iconStyle['color'] = '#4F505E';
            }
        }

        if (item.get('notices')) {
            if (item.get('notices').get('icon') === 'shield') {
                return (
                    <i className={"__notice-icon fas fa-shield-alt"} style={iconStyle}/>
                )
            } else if (item.get('notices').get('icon') === 'flag') {
                return(
                    <i className={"__notice-icon fas fa-flag"} style={iconStyle}/>
                )
            }
        }

    }

    renderNotes(item) {
        if (item.get('patient')) {
            if (item.get('notes')) {
                return item.get('notes')
            } else {
                return '--'
            }
        } else {
            return null
        }
    }

    renderAcuityLevel(item) {
        if (item.get('patient')) {
            if (item.get('acuityLevel')) {
                let acuityLevelStyle = {};

                if (item.get('acuityLevel') === 1) {
                    acuityLevelStyle['backgroundColor'] = '#8BC34A';
                }
                if (item.get('acuityLevel') === 2) {
                    acuityLevelStyle['backgroundColor'] = '#2196F3';
                }
                if (item.get('acuityLevel') === 3) {
                    acuityLevelStyle['backgroundColor'] = '#FCBA25';
                }
                if (item.get('acuityLevel') === 4) {
                    acuityLevelStyle['backgroundColor'] = '#F44336';
                }
                return (
                    <div className={"__acuity-level"}>
                        <i className={"__acuity-level-circle"} style={acuityLevelStyle}/>
                        <div className={"__acuity-level-text"}> {item.get('acuityLevel')}</div>
                        {item.get('review')? <div className={"__acuity-level-review"}>
                            -
                            <div className={"__acuity-level-review-text"}>review</div>
                        </div> : null}
                    </div>
                )
            } else {
                return <div className={"__grade-acuity"}>grade</div>
            }
        } else {
            return null
        }
    }

    renderRowCell(label, key) {
        const {item} = this.props;

        let cellStyle = {};

        if (label.get('labelWidth')) {
            cellStyle['width'] = label.get('labelWidth')
        }
        if (label.get('labelJustifyContent')) {
            cellStyle['justifyContent'] = label.get('labelJustifyContent')
        }

        if (label.get('labelKey') === 'notices') {
            console.log(item.toJS(), "notices item")
            if (item.get('patient') && !item.get('notices')) {
                return (
                    <div className={"__row-cell"} key={key} style={cellStyle}>
                        --
                    </div>
                )
            } else {
                return(
                    <div className={"__row-cell"} key={key} style={cellStyle}>
                        { this.renderNoticeIcon(item)}
                        { this.renderNotices(item) }
                    </div>
                )
            }


        } else if (label.get('labelKey') === 'notes') {
            return (
                <div className={"__row-cell"} key={key} style={cellStyle}>
                    { this.renderNotes(item)}
                </div>
            )

        } else if (label.get('labelKey') === 'staff') {
            return (
                <div className={"__row-cell"} key={key} style={cellStyle}>
                    {item.get('staff')}
                </div>
            )

        } else if (label.get('labelKey') === 'acuityLevel') {
            return (
                <div className={"__row-cell"} key={key} style={cellStyle}>
                    { this.renderAcuityLevel(item)}
                </div>
            )

        } else {
            return (
                <div className={"__row-cell"} key={key} style={cellStyle}>
                    {item.get(label.get('labelKey'))}
                </div>
            )
        }
    }

    renderExpandedRowCells(label, key, item) {
        let expandedCellStyle = {};

        if (label.get('labelKey') == 'room') {
            expandedCellStyle['width'] = label.get('labelWidth')
            return <div className={"__expanded-row-cell"} style={expandedCellStyle}/>
        } else if (label.get('labelKey') == 'patient') {
            return (
                <div className={"__expanded-row-cell"}>
                    <ul className={"__expanded-list"}>
                        {item.get('expandedList').map((listItem, key) => <li key={key} className={"___expanded-list-item"}>{listItem}</li>)}
                    </ul>
                </div>
            )
        }
    }

    renderExpandedRow(item) {
        const { expanded } = this.state;
        const { tableLabels } = this.props;

        if (item.get('patient')) {
            return (
                <div className={expanded? "__expanded-row _display" : "__expanded-row"}>
                    <div className={"__expanded-row-spacer"}/>
                    { tableLabels.map((label, key) => this.renderExpandedRowCells(label, key, item) )}
                    <div className={"__expanded-row-spacer"}/>
                </div>
            )
        } else {
            return null
        }
    }

    renderExpandedRowDivider(item) {
        const { expanded } = this.state;

        if (item.get('patient')) {
            return (
                <div className={expanded? "__expanded-row-divider _display" : "__expanded-row-divider"}>
                    <div className={"__expanded-row-divider-spacer"}/>
                    <div className={"__expanded-row-divider-line"}/>
                    <div className={"__expanded-row-divider-spacer"}/>
                </div>
            )
        } else {
            return null
        }
    }

    expandRow() {
        const { expanded } = this.state;
        this.setState({
            expanded: !expanded
        })
    }

    render() {
        const { unexpandedHeight, tableLabels, item } = this.props;
        const { expanded } = this.state;

        let rowStyle = {};

        if (unexpandedHeight) {
            rowStyle['height'] = unexpandedHeight;
        }

        return(
            <div className={"PatientCensusRow"} >
                <div className={"__unexpanded-row"} style={rowStyle}>
                    {
                        item.get('patient')? <div className={"__expansion-button"} onClick={this.expandRow.bind(this)}>
                            {expanded? <i className={"fas fa-chevron-up"}/> : <i className={"fas fa-chevron-down"}/>}
                        </div> : <div className={"__expansion-button"}/>
                    }
                    {
                        tableLabels.map((label, key) => this.renderRowCell(label, key))
                    }
                    <div className={"__row-actions"}>
                        {
                            item.get('patient')? <i className={"__patient-action fas fa-ellipsis-h"}/> : null
                        }
                    </div>
                </div>
                { this.renderExpandedRowDivider(item) }
                { this.renderExpandedRow(item)}
            </div>
        )
    }
}
