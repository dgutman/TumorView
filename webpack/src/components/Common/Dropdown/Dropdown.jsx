import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import styles from './Dropdown.scss';

export default class Dropdown extends Component {
  static propTypes = {
    items: ImmutablePropTypes.list,
    title: PropTypes.any,
    width: PropTypes.string,
    contentWidth: PropTypes.string,
    dropdownContentBackgroundColor: PropTypes.string,
    dropdownContentColor: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      dropdownVisible: false,
    }
  }

  handleToggleDropdown() {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    })
  }

  handleClickAway(e) {
    const { dropdownVisible } = this.state;

    if (dropdownVisible && !this.dropdown.contains(e.target)) {
      this.handleToggleDropdown.bind(this)()
    }

  }

  componentDidMount() {
    window.addEventListener("click", (e) => this.handleClickAway.bind(this)(e))
  }

  componentWillUnmount() {
    window.removeEventListener("click", (e) => this.handleClickAway.bind(this)(e))
  }

  render() {
    const { dropdownVisible } = this.state;
    const { title, items, dropdownContentBackgroundColor, width, contentWidth, dropdownContentColor } = this.props;

    const dropdownStyle = {
      width: width
    }

    const dropdownContentStyle = {
      backgroundColor: dropdownContentBackgroundColor,
      width: contentWidth,
      color: dropdownContentColor
    }

    return(
      <div className={"Dropdown"} style={dropdownStyle} ref={(dropdown) => this.dropdown = dropdown}>
        <div className={"__dropdown-title"} onClick={this.handleToggleDropdown.bind(this)}>
          {title}
          {dropdownVisible? <i className={"__dropdown-chevron fas fa-chevron-up"}/> : <i className={"__dropdown-chevron fas fa-chevron-down"}/>}
        </div>
        <div className={dropdownVisible? "__dropdown-content _display" : "__dropdown-content"} style={dropdownContentStyle}>
          <ul className={"__dropdown-content-list"}>
            { items.map((item, key) => <li className={"__dropdown-content-list-item"} onClick={item.get("onClick")} key={key}>{item.get("name")}</li>)}
          </ul>
        </div>
      </div>
    )
  }
}
