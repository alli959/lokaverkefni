import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Button from '../button';

import './Header.css';

import querystring from 'querystring';

class Header extends Component {
  state = {

  }

  static propTypes = {
    dispatch: PropTypes.func,
  }



  render() {
    return (
      <header className="header">
        <div class="navBar">
            <a class="Offers" href="offers">Tilboð</a>
            <a href="contact">Contact</a>
            <a href="about">About</a>
        </div>
        <h1 className="header__heading"><Link to="/">Gullnesti</Link></h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(Header);