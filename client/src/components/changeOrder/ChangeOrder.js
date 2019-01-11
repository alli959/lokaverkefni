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







class ChangeOrder extends Component {

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
        clickHandler: PropTypes.func,
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

    handleButtonClick = (e) => {
        let name = e.currentTarget.getAttribute('id');
        let changeMaterials = []
        changeMaterials.push("changeMaterials");
        changeMaterials.push(name);
        this.props.clickHandler(changeMaterials);
       
    }


    checkisOffer(isOffer, value){
        let menu = this.props.menu.result;
        let contains = value.contains.split(',');
        if(isOffer){
            let subContains = [];
            menu.map(result => {
                if(result.name === contains[0]){
                    subContains = result.contains.split(',');
                }
            })
            let item = contains.shift();
            return(
                <div className = "item">
                    <h2 className = "item_name">{value.name}</h2>
                    <button key = "changeMaterials" id={item} onClick = {this.handleButtonClick}><h3 className = "subItem_name">{item}</h3></button>
                    <div className = "subContains">
                    {subContains.map(result =>  
                        <p>{result}, </p>
                    )}
                    </div>
                    {contains.map(result =>
                        <h3 className = "contains">{result}</h3>
                    )}
                    
                </div>
            )
        }

        return(
            <div className = "item">
                <h2 className = "item_name">{value.name}</h2>
                <div className = "subContains">
                {contains.map(result =>
                    <p>{result}, </p>
                )}
                </div>
            </div>
        )
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
            <div className = "changeOrder">
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

ChangeOrder.PropTypes = {
    food: PropTypes.array,
    menu: PropTypes.object,
}

export default withRouter(ChangeOrder);