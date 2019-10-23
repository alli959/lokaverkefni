import React, { Component } from 'react';

import {withRouter } from 'react-router-dom'

import './navbar.css';



class Navbar extends Component {
    
    render(){
        return (
            <ul className="navBar">
                <button><a className="Offers" href="#offers">Tilboð</a></button>
                <button><a className="Burgers" href="#burgers">Borgarar</a></button>
                <button><a className="Boats" href="#boats">Bátar</a></button>
                <button><a className="Sandwiches" href="#sandwiches">Samlokur</a></button>
            </ul>

        )
    }

}


export default withRouter(Navbar);