import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';

import Offers from '../../components/offers';
import Burgers from '../../components/burgers';
import Boats from '../../components/boats';
import Sandwiches from '../../components/sandwiches';
import Navbar from '../../components/navbar';
import OrderView from '../../components/orderView';

import './menu.css';







class Menu extends Component {

    state = {
        name: "",
        itemsInOrderView:[],
    }


    handleButtonClick = (e) => {
        console.log('E', e);
        if(e === "clear"){
            this.setState({
                itemsInOrderView: []
            });
        }
        else{
            const { itemsInOrderView } = this.state;
            itemsInOrderView.push(e);
        
            this.setState({
            itemsInOrderView: itemsInOrderView 
            });
        }
      }
      
      


    render() {
        switch(this.props.location.hash){
            case '#offers':
                return(
                    <div>
                        <div classname = "Navbar">
                            <Navbar />
                        </div>

                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleButtonClick} />
                        <h1 className = "Menu_title">Tilboð</h1>
                        <div>
                            <Offers  clickHandler={this.handleButtonClick}/>
                        </div>
                    </div>
                    );
            case '#burgers':


                return(
                    <div>
                        <div classname = "Navbar">
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleButtonClick} />
                        <h1 className = "Menu_title">Borgarar</h1>
                        <Burgers clickHandler={this.handleButtonClick} />
                    </div>
                    );
            case '#boats':


                return(
                    <div>
                        <div classname = "Navbar">
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleButtonClick} />
                        <h1 className = "Menu_title">Bátar</h1>
                        <Boats clickHandler={this.handleButtonClick} />
                    </div>
                    );

            case '#sandwiches':
                return(
                    <div>
                        <div classname = "Navbar">
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleButtonClick} />
                        <h1 className = "Menu_title">Samlokur</h1>
                        <Sandwiches clickHandler={this.handleButtonClick} />
                    </div>
                    );
            default:
                return(
                    <div>
                        <div classname = "Navbar">
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleButtonClick} />
                        <h1 className = "Menu_title">Tilboð</h1>
                        <Offers clickHandler={this.handleButtonClick} />
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