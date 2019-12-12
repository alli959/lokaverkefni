import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.css';


export default class Button extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    onClick: () => {},
  }

  render() {
    const { children, className, onClick, disabled } = this.props;

    const classes = `button ${className}`

    return (
      <button disabled={disabled} onClick={onClick} className={classes}>{children}</button>
    );
  }

}
