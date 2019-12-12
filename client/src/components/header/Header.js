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
    if(this.props.location.pathname !== '/'){
      return(
        <div></div>
      )
    }
    
    return (
      <div className = "Front">

      <header className="header" style = {{background: "rgb(255, 188, 5)"}}>
        <div className = "header-start">
          <Link to="/">
          <img src={require('../../Images/gullnesti-logo.png')} alt = "Gullnesti" style = {{maxWidth: '9em', maxHeight: '8em'}} />
          </Link>
          <Button className="button__heading"><Link to="/menu">Matseðill</Link></Button>
        </div>
      </header>
        <div className = "IceCreamBoard" style = {{background: "rgba(238, 228, 218, 0.5)" , display: 'flex'}}>
          <img src={require('../../Images/ice-cream.png')} alt = "Ice Cream" style = {{ display: 'flex', margin: 'auto', width: 'auto', maxWidth: '42em', border: '1px'}}/>
        </div>
      </div>
    );
  }
}



export default withRouter(Header);