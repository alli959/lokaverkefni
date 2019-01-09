import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';

import Offers from '../../components/offers';
import Burgers from '../../components/burgers';
import {fetchFoods} from '../../actions/getFood'
import Boats from '../../components/boats';
import Sandwiches from '../../components/sandwiches';
import Navbar from '../../components/navbar';
import OrderView from '../../components/orderView';
import ChangeOrder from '../../components/changeOrder';


import './menu.css';







class Menu extends Component {

    state = {
        isFetching: false,
        foods: null,
        message: null,
        itemsInOrderView:[],
    }
    
    static PropTypes = {
        foods: PropTypes.object,
        dispatch: PropTypes.func,
        isFetching: PropTypes.object,
        message: PropTypes.object,
    }


    async componentDidMount() {
        const { dispatch} = this.props;
        let foods = await this.props.food;
        await this.setState({
            food: foods,
        })
        dispatch(fetchFoods());
    }

    handleButtonClick = (e) => {
        if(e === "clear"){
            this.setState({
                itemsInOrderView: []
            });
        }
        else{
            if(e !== "change" && e !== "finish"){
                const { itemsInOrderView} = this.state;
                itemsInOrderView.push(e);
                this.setState({
                itemsInOrderView: itemsInOrderView,
                });
            }
        }
        console.log("itemsInOrderView", this.state.itemsInOrderView);
        
      }
      
      


    render() {
        console.log(this.state.foods);
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
                        <div className = "Navbar">
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

            case '#changeorder':
                return(
                    <div>
                        <ChangeOrder food={this.state.itemsInOrderView} menu={this.props.foods} />
                    </div>
                )
            default:
                return(
                    <div>
                        <div className = "Navbar">
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
        isFetching: state.getFood.isFetching,
        foods: state.getFood.food,
        message: state.getFood.message
    }
        
}

export default connect(mapStateToProps)(Menu);