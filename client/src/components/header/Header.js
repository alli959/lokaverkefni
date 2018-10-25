import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Button from '../button';
import { Route, Switch, withRouter } from 'react-router-dom'

import './Header.css';

import querystring from 'querystring';

import createHistory from 'history/createBrowserHistory';

class Header extends Component {
  state = {

  }

  static propTypes = {
    dispatch: PropTypes.func,
  }



  render() {

    const {pathname} = this.props.location;
    
    /*if(pathname === '/'){
      return (
        <header className="header">
          <div class="menu">
            <h2 className="menu__button"><Link to="/menu">Matseðill</Link></h2>
          </div>
        </header>
      );
    }*/
    
    return (
      <header className="header">
        <div className="navBar">
            <a className="Offers" href="#offers">Tilboð</a>
            <a className="Burgers" href="#burgers">Borgarar</a>
            <a className="Boats" href="#boats">Bátar</a>
            <a className="Sandwiches" href="#sandwiches">Samlokur</a>
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

export default withRouter(Header);