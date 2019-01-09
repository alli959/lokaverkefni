import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchFoods } from '../../actions/getFood';
import { fetchFood } from '../../actions/getFood';
import { Route, Switch, withRouter } from 'react-router-dom'



import Offer from '../offers';


import './orderView.css';



class OrderView extends Component {

    state = {
        food:[],
    }

    static propTypes = {
        dispatch: PropTypes.func,
        food: PropTypes.array,
        clickHandler: PropTypes.func,
    }


    




    async componentDidMount() {
        let foods = await this.props.food;
        await this.setState({
            food: foods,
        })


    }

    handleButtonClick = (e) =>{
    
        let buttonName = e.currentTarget.getAttribute('name');
        if(buttonName === "clearOrder"){
            this.props.clickHandler("clear");
        }
        else if(buttonName === "finishOrder"){
            this.props.clickHandler("finish");
        }
        else{
            this.props.clickHandler("change");
        }
    }
        


    render() {

        const {
            food,
        } = this.props;
    

        
        if(this.state.food === null){
                this.setState({
                    food: food,
                })
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
            <ul className = "orderButtons">
                <button onClick={this.handleButtonClick} key="changeOrder" name="changeOrder"><a className = "change_Order" href="#changeorder">Breyta Pöntun</a></button>
                <button onClick={this.handleButtonClick} key="finishOrder" name="finishOrder"><a className = "finish_Order" href="#finishorder">Klára Pöntun</a></button>
                <button onClick={this.handleButtonClick} key="clearOrder" name="clearOrder">Hreinsa Pöntun</button>
            </ul>
        </div>
        )
    }
    
    
    return(
        <div className = "orderBox">
            Engar pantanir skráðar
        </div>
    );
  }
}

OrderView.propTypes = {
    food: PropTypes.array,
}


export default withRouter(OrderView);




