import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Button from '../button';
import {withRouter } from 'react-router-dom'

import './Header.css';


class Header extends Component {
  state = {

  }

  static propTypes = {
    dispatch: PropTypes.func,
  }



  render() {

    
    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Gullnesti</Link></h1>
        <Button className="button__heading"><Link to="/menu">Matseðill</Link></Button>
      </header>
    );
  }
}



export default withRouter(Header);