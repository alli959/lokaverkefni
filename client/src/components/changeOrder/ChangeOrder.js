import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {withRouter } from 'react-router-dom'

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

    static propTypes = {
        menu: PropTypes.object,
        food: PropTypes.array,
        clickHandler: PropTypes.func,
    }

    async componentDidMount() {


        
        //putting it allt in a dirrerent array so It will be easier to send in the order.
        let foods = this.props.food;
        let names = [];
        let isOffers = [];
        let contains = [];
        let plus = [];
        let minus = [];
        let price = [];
        let menu = this.props.menu;

        foods.map(result => {
            names.push(result.name)
            isOffers.push(result.isOffer)
            contains.push(result.contains)
            plus.push(result.plus)
            minus.push(result.minus)
            price.push(result.price)
        })
   

        this.setState({
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
        let name = e.currentTarget.getAttribute('name');
        let index = e.currentTarget.getAttribute('id');
        let changeMaterials = []
        console.log("e", e.currentTarget);
        changeMaterials.push("changeMaterials");
        changeMaterials.push(name);
        changeMaterials.push(index);
        this.props.clickHandler(changeMaterials);
       
    }


    checkisOffer(isOffer, value, index){
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
                    <button key = "changeMaterials" id={index} name={item} onClick = {this.handleButtonClick}><h3 className = "subItem_name">{item}</h3></button>
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
        console.log(food)



        if(food === null || food.length === 0){
            return(
                <h2> Engar pantanir skráðar... </h2>
            )
        }




        return (
            <div className = "changeOrder">
                <ul className = "changeOrderBox">
                    {food.map((result, index) =>
                    <div key = {index}>
                        {this.checkisOffer(result.isoffer, result, index)}
                    </div>
                    )}
                </ul>
                
            </div>
        )

        

    }
}

ChangeOrder.propTypes = {
    food: PropTypes.array,
    menu: PropTypes.object,
}

export default withRouter(ChangeOrder);