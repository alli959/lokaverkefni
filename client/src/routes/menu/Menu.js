import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';

import Offers from '../../components/offers';
import Burgers from '../../components/burgers';
import Boats from '../../components/boats';
import Sandwiches from '../../components/sandwiches';

import './menu.css';


class Menu extends Component {


    render() {
        switch(this.props.location.hash){
            case '#offers':
                return(
                    <div>
                        <h1 className = "Menu_title">Tilboð</h1>
                        <Offers />
                    </div>
                    );
            case '#burgers':
                return(
                    <div>
                        <h1 className = "Menu_title">Borgarar</h1>
                        <Burgers />
                    </div>
                    );
            case '#boats':
                return(
                    <div>
                        <h1 className = "Menu_title">Bátar</h1>
                        <Boats />
                    </div>
                    );
            case '#sandwiches':
                return(
                    <div>
                        <h1 className = "Menu_title">Samlokur</h1>
                        <Sandwiches />
                    </div>
                    );
            default:
                return(
                    <div>
                        <h1 className = "Menu_title">Tilboð</h1>
                        <Offers />
                        <h1 className = "Menu_title">Borgarar</h1>
                        <Burgers />
                        <h1 className = "Menu_title">Bátar</h1>
                        <Boats />
                        <h1 className = "Menu_title">Samlokur</h1>
                        <Sandwiches />
                    </div>
                );
            
        }

    }




}

const mapStateToProps = (state) => {

    return {

    }
        
}

export default connect(mapStateToProps)(Menu);