import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {withRouter } from 'react-router-dom'





import './orderView.css';



class OrderView extends Component {



    state = {
        food:[],
        countItemsInFood: [],
    }

    static propTypes = {
        dispatch: PropTypes.func,
        food: PropTypes.array,
        minus: PropTypes.array,
        plus: PropTypes.array,
        plusPrice: PropTypes.array,
        clickHandler: PropTypes.func,
    }


    




    async componentDidMount() {
        let foods = await this.props.food;
        let minus = await this.props.minus;
        let plus = await this.props.minus;
        let plusPrice = await this.props.plusPrice;
        let {countItemsInFood} = this.state;
        for(let i = 0; i<foods.length; i++){
            if(foods[i].name.includes("Tilboð")){
                countItemsInFood.push(foods[i].contains.length);
            }
            else{
                countItemsInFood.push(1);
            }
        }
        this.setState({
            food: foods,
            countItemsInFood: countItemsInFood,
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

        const {food, minus, plus, plusPrice} = this.props;
        const {countItemsInFood} = this.props;

        console.log("countItemsInFood", countItemsInFood);
        console.log("food",food);
        console.log("minus", minus);

        const plusPriceArr = [];
        for(let i = 0; i<plusPrice.length; i++ ){
            const temp = plusPrice[i].split(',');
            plusPriceArr.push(temp);
        }

        

    if(food.length !== 0){
        // start by finding total price.
        let totalPrice = 0;
        food.map(foods =>
            totalPrice += foods.price
        );
        plusPrice.map((value) => {

            if(value !== "NONE"){
                const temp = value.split(',');
                for(let i = 0; i<temp.length; i++){
                    totalPrice += parseInt(temp[i]);
                }
            }
        });
        



        return (
            
        <div className = "order">
            <div className = "orderBox" style = {{background: "white", marginTop: '1em'}}>
                <ul className = "orderBoxValues">
                    {food.map((foods,id) =>
                    <div key = {id}>
                    {countItemsInFood[id] === 1?
                    <div className = "FoodItem">

                        <li className = "orderItem" key = {id}>
                            <div className = "foodName">
                                <h4>{foods.name}</h4>
                            </div>
                            <div className = "foodPrice">
                                <h4>{foods.price}kr.</h4>
                            </div>
                        </li>
                        {minus[id] != "NONE"?
                        <div className = "MINUS">
                            <h5 style = {{maxHeight: "20px"}}>mínus</h5>
                            <p>{minus[id]}</p>    
                            </div>:<div></div>
                            }
                            {plus[id] !== "NONE"?
                            <div className = "PLUS">
                                <h5 style = {{maxHeight: "20px"}}>plús</h5>
                                <div>

                                {plus[id].split(',').map((plusName, index) =>
                                <div  className = "PLUS_VALUES">
                                    <p>{plusName}</p>
                                    <p style = {{fontWeight: "bold"}}>{plusPriceArr[id][index]}kr.</p>
                                </div>
                                )}
                                </div>
                            </div>:<div></div>
                                
                            }                           

                            </div>

                    :
                    <div className = "OfferItem">

                        <li className = "orderItem">
                            <div className = "foodName">
                                <div className = "Offer">
                                    <h3>{foods.name}</h3>
                                    {foods.contains.map((contains,id) =>
                                    <div className = "itemName">
                                        
                                        
                                    </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    </div>
                }
                </div>
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
                <button onClick={this.handleButtonClick} key="clearOrder" name="clearOrder"><a className = "clearOrder_font">Hreinsa Pöntun</a></button>
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




