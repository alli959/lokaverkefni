import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import { fetchFoodFromOffer } from '../../actions/getFoodFromOffer';
import { fetchMatFromFood } from '../../actions/getMaterialsFromFood';
import { fetchMaterials } from '../../actions/getMaterials';

import './changeOrder.css';
import Button from '../button';







class ChangeOrder extends Component {

    state = {
        items: null,
        itemId: [],
        offers: [],
        food: [],
        plus: [],
        plusPrice: [],
        minus: [],
        foodInOffer: [],
        totalPrice: 0,
    }

    static propTypes = {
        items: PropTypes.array,
        minus: PropTypes.array,
        plus: PropTypes.array,
        clickHandler: PropTypes.func,
        isFetching: PropTypes.bool,
        foodInOffer: PropTypes.array,
        message: PropTypes.object,
        dispatch: PropTypes.func,
    }
    
    async getFoodInOffers(){
        const {dispatch} = this.props;
        const foodInOffers = [];
        for(let i = 0; i<this.state.offers.length; i++){
            const offerId = this.state.offers[i].id;
            if(offerId !== -1){
                await dispatch(fetchFoodFromOffer(offerId));
                const temp = await this.props.foodInOffer;
                const foodInOffer = [];
                for(let j = 0; j<temp.length; j++){
                    foodInOffer.push(temp[j].foodname);
                }
                foodInOffers.push(foodInOffer);
            }
            else{
                const empty = [{none:"NONE"}];
                foodInOffers.push(empty);
            }
        }

        return foodInOffers;


        
    }




    static getDerivedStateFromProps(props, state) {
    
    
    if(JSON.stringify(props.minus) !== JSON.stringify(state.minus)){
        return {minus: props.minus}
        }
        return null;
    }




    async componentDidMount() {
        
        const {dispatch} = this.props;
        
        //putting it allt in a dirrerent array so It will be easier to send in the order.
        let {items} = await this.props;

        let offers = [];
        let food = [];
        let foodInOffers = [];
        let {plus} = await this.props;
        let {minus} = await this.props;
        items.map(result => {
            if(result.name.includes("Tilboð")){
                offers.push({ id: result.id, name: result.name});
                food.push({id: -1, name: "NONE"});
            }
            else{
                offers.push({id: -1, name: "NONE"});
                food.push({ id: result.id, name: result.name});
            }
        })
        
        for(let i = 0; i<offers.length; i++){
            const offerId = offers[i].id;
            if(offerId !== -1){
                await dispatch(fetchFoodFromOffer(offerId));
                const temp = await this.props.foodInOffer;
                const foodInOffer = [];
                for(let j = 0; j<temp.length; j++){

                    const id = temp[j].foodid;
                    const foodName = temp[j].foodname
                    foodInOffer.push({foodId: id, foodname: foodName});
                }
                foodInOffers.push(foodInOffer);
            }
            else{

                foodInOffers.push([{foodId: -1, foodname: "NONE"}]);
            }
        }

        this.setState({
            items: items,
            offers: offers,
            food: food,
            plus: plus,
            minus: minus,
            foodInOffer: foodInOffers,
            totalPrice: 0,
        })
        
    }



    componentDidUpdate(prevProps) {
        const {minus} = this.props;
        const {plus} = this.props;
        if((JSON.stringify(prevProps.minus) !== JSON.stringify(this.props.minus)) || (JSON.stringify(prevProps.plus) !== JSON.stringify(this.props.plus))){
            this.setState({
                minus: minus,
                plus: plus,
            })
        }
    } 

    addFoodItem(callback, id){
        const itemId = callback(false)
        this.props.clickHandler({
            itemId: callback(false),
            foodId: id
        })
    }




    addOffer(callback, foodinoffer,offer, minus, plus){
        if(foodinoffer[0].foodname === "NONE" || !foodinoffer){
            return;
        }
        else{

            return (
            <div>
            
            <div className = "offerName">
                <h2>{offer.name}</h2>
            </div>
            {foodinoffer.map((result,index) =>
                <div key = {index} value = {result.foodname} className = "foodItem">
                    {this.addFood(callback,{id: result.foodId, name: result.foodname}, minus, plus)}
            </div>
            
            )}
            </div>
        )
    }
}

    addFood(callback,food, minus, plus){
        if(food.name === "NONE"){
            return;
        }
        const key = callback(true);
        const item = {
            itemId: key,
            foodId: food.id
        }
        return(
            <div key = {key} id = {key} value = {food.id} className = "foodItem">
                <Button id = {key} onClick = {() => {
                    this.props.clickHandler({
                        itemId: key,
                        foodId: food.id
                    })
                }}>
                    <p>{food.name}</p>
                </Button>
                {minus[key] !== "NONE"?<p>-{minus[key]}</p>:<div></div>}
                {plus[key] !== "NONE" ? <p>+{plus[key]}</p>:<div></div>}
            </div>
        )
    }






    handleButtonClick = (e) => {
        /*
        let name = e.currentTarget.getAttribute('name');
        let index = e.currentTarget.getAttribute('id');
        let changeMaterials = []
        console.log("e", e.currentTarget);
        changeMaterials.push("changeMaterials");
        changeMaterials.push(name);
        changeMaterials.push(index);
        this.props.clickHandler(changeMaterials);
       */

       console.log(e.keyCode);
    }

    isHidden(value){
        if(value === "NONE"){
            return true;
        }
        else{
            return false;
        }
    }


/*
            <div key = {index} className = "order">
                <h2 className = "offer_name" style={this.isHidden(result.offer.name)?{display:"none"}:{display: "flex"}}>{result.offer.name}</h2>
                {result.foodInOffer.map((food,i) => 
                    
                    <div key = {i+index} className = "offer_item">
                        <button style={this.isHidden(food)?{display:"none"}:{display: "inline"}} id={i} name={food} onClick = {this.handleButtonClick}>
                            <h3 id = {i}>{food}</h3>
                        </button>
                    </div>    
                )}
                <button style={this.isHidden(result.food.name)?{display:"none"}:{display: "inline"}} id={index} name={result.food.name} onClick = {this.handleButtonClick}><h3>{result.food.name}</h3></button>
                <div className = "subContains">
            
                </div>
            </div>*/

    
    






    render() {
        const {items } = this.props;
        const {offers} = this.state;
        const {food} = this.state;
        const {foodInOffer} = this.state;
        const {minus} = this.state;
        const {plus} = this.state;

        const order = [];
        //putting all information to an array of object so I can map through the object
        for(let i = 0; i<offers.length; i++){
            let temp = {
                offer: offers[i],
                food: food[i],
                foodInOffer: foodInOffer[i]
            }
            order.push(temp);
        }



        //adding an itemId

        let itemId = [];
        for(let i = 0; i<order.length; i++){
            if(order[i].food.name === "NONE"){
                for(let j = 0; j<order[i].foodInOffer.length; j++){
                    itemId.push(itemId.length);
                }
            }
            else{
                itemId.push(itemId.length);
            }
        }

        const callback = (shouldShift) => {
                if(shouldShift){
                    return(itemId.shift());
                }
                else{
                    return(itemId[0]);
                }
                
            
        }


        



        if(items === null || items.length === 0){
            return(
                <h2> Engar pantanir skráðar... </h2>
            )
        }





        return (
            <div className = "changeOrder">
                <ul className = "changeOrderBox">
                    {order.map((result,index) =>
                    <div className = "orderItem" key = {index}>
                        
                        {this.addOffer(callback,result.foodInOffer,result.offer, minus, plus)}
                        {this.addFood(callback, result.food, minus, plus)}
                    </div>
                    )}
                </ul>
            </div>
        )

        

    }
}

const mapStateToProps = (state) => {
    return {
      isFetching: state.getFoodFromOffer.isFetching,
      foodInOffer: state.getFoodFromOffer.foodInOffer,
      message: state.getFoodFromOffer.message,
    };
  }

export default withRouter(connect(mapStateToProps)(ChangeOrder));