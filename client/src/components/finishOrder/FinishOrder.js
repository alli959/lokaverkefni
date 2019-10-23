import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'


import './finishOrder.css';







class FinishOrder extends Component {

    state = {
        food: [],
        name: '',
        isFetching: false,
        message: null,
        order: null,
    }

    static propTypes = {
        food: PropTypes.array,
        dispatch: PropTypes.func,
        isFetching: PropTypes.bool,
        message: PropTypes.string,
        submitHandler: PropTypes.func,
    }

    async componentDidMount() {

        let foods = await this.props.food;
        await this.setState({
            food: foods,
        })

    }


    
    handleSubmit = async (e) => {
        
        e.preventDefault();

        let order = {};
        let foods = this.state.food;
        let orderName = this.state.name;
        let foodName = [];
        let minus = [];
        let plus = [];
        for(var i = 0; i<foods.length; i++){
            foodName.push(foods[i].name);
        }
        order.orderName = orderName;
        order.foodName = foodName;
        order.minus = minus;
        order.plus = plus;

        this.setState({
            order: order
        });

        console.log("hello");
        return <Redirect to='/finish'/>


        
        
    }
     
     handleChange = async (e) => {

        this.setState({
            name: e.target.value,
        });
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


        if(food.length !== 0){
            console.log("food", food);
            // start by finding total price.
            let totalPrice = 0;
            food.map(foods =>
                totalPrice += foods.price
            );



        return (
            <div className = "order">
                <div className = "orderBox">
                    <ul className = "orderBoxValues">
                        {food.map(foods =>
                        <li className = "orderItem">
                            <div className = "foodName">
                                <h4>{foods.name}</h4>
                            </div>

                            <div className = "foodPrice">
                                <h4>{foods.price}kr.</h4>
                            </div>
                        </li>
                        )}
                        <div className = "totalPrice">
                            <h4>Samtals:</h4>
                            <h4>{totalPrice}kr.</h4>
                        </div>
                    </ul>
                </div>
                <div className = "textBox">
                    <form onSubmit={this.handleSubmit}>
                        <a className = "Name">nafn: </a>
                        <input type="text" value={this.state.name} onChange={this.handleChange}  name="Name"></input>
                        <input type = "submit" value="Submit" name="finish"></input>
                    </form>
                </div>
            </div>
            
        )}

        

    }
}

FinishOrder.propTypes = {
    food: PropTypes.array,
}



export default withRouter(FinishOrder);