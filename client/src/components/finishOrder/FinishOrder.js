import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';

import { fetchFoods } from '../../actions/getFood'
import { fetchMaterials } from '../../actions/getMaterials'
import Offers from '../../components/offers';
import Burgers from '../../components/burgers';
import Boats from '../../components/boats';
import Sandwiches from '../../components/sandwiches';
import Navbar from '../../components/navbar';
import OrderView from '../../components/orderView';
import { Route, Switch, withRouter } from 'react-router-dom'

import './changeOrder.css';







class FinishOrder extends Component {

    state = {
        menu: null,
        isFetching: false,
        food: null,
        message: null,
        name: [],
        isOffer: [],
        contains: [],
        plus: [],
        minus: [],
        price: [],
        totalPrice: 0,
    }

    static PropTypes = {
        menu: PropTypes.object,
        food: PropTypes.array,
    }

    async componentDidMount() {


        
        //putting it allt in a dirrerent array so It will be easier to send in the order.
        let foods = await this.props.food;
        let names = [];
        let isOffers = [];
        let contains = [];
        let plus = [];
        let minus = [];
        let price = [];
        let menu = await this.props.menu;

        foods.map(result => {
            names.push(result.name)
            isOffers.push(result.isOffer)
            contains.push(result.contains)
            plus.push(result.plus)
            minus.push(result.minus)
            price.push(result.price)
        })
   

        await this.setState({
            menu: menu,
            food: foods,
            name: names,
            isOffer: isOffers,
            contains: contains,
            plus: plus,
            minus: minus,
            price: price,

        })

    }


    
        
    


      



    render() {
        const {food } = this.props;

        if(this.state.food === null) {
            this.setState({
                food: food,
            })
        }


        if(food === null || food.length === 0){
            return(
                <h2> Engar pantanir skráðar... </h2>
            )
        }




        return (
            <div className = "finishOrder">
                <ul className = "changeOrderBox">
                    {food.map(result =>
                    <div>
                        {this.checkisOffer(result.isoffer, result)}
                    </div>
                    )}
                </ul>
                
            </div>
        )

        

    }
}

FinishOrder.PropTypes = {
    food: PropTypes.array,
    menu: PropTypes.object,
}

export default withRouter(FinishOrder);