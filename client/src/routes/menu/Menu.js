import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Offers from '../../components/offers';
import Burgers from '../../components/burgers';
import {fetchFoods} from '../../actions/getFood'
import Materials from '../../components/materials'
import Boats from '../../components/boats';
import Sandwiches from '../../components/sandwiches';
import Navbar from '../../components/navbar';
import OrderView from '../../components/orderView';
import ChangeOrder from '../../components/changeOrder';
import FinishOrder from '../../components/finishOrder';


import './menu.css';







class Menu extends Component {

    state = {
        foodId: 0,
        itemId: -1,
        countItemsInFood: [],
        foods: null,
        isFetching: false,
        foodToChange: null,
        minus: [],
        plus: [],
        plusPrice: [],
        message: null,
        itemsInOrderView:[],
        
    }
    
    static propTypes = {
        foodId: PropTypes.number,
        foods: PropTypes.object,
        materialsToChange: PropTypes.string,
        dispatch: PropTypes.func,
        isFetching: PropTypes.bool,
        message: PropTypes.object,
    }


    componentDidMount() {
        const { dispatch} = this.props;
        let foods = this.props.foods;
            this.setState({
                foods: foods,
            },() => {console.log("foods",this.state.foods)})
        dispatch(fetchFoods());
    }


    componentDidUpdate(prevProps){
        if(prevProps.location.hash !== this.props.location.hash){
            this.setState({
                itemId: -1,
            })
        }
    }

    /**ACTIONS */


    materialsPlus = (e) => {
        const {itemId} = this.state;
        let {plus} = this.state;
        let {minus} = this.state;
        let {plusPrice} = this.state;
        let doesExist = false;

    
        //check if added Material is already in minus
        let minusArr = minus[itemId].split(',');
        if(minus[itemId] !== "NONE"){
            for(let i = 0; i<minusArr.length; i++){
                if(minusArr[i] === e.name){
                    doesExist = true;
                    minusArr.splice(i);
                    if(minusArr.length !== 0){
                        minus[itemId] = minusArr.join(',');
                    }
                    else{
                        minus[itemId] = "NONE";
                    }
                    break;
                }
            }
        }

        if(!doesExist){

            
            if(plus[itemId] === "NONE"){
                plus[itemId] = e.name;
                plusPrice[itemId] = e.price.toString();
            }
            else{
                plus[itemId] = plus[itemId] + ',' + e.name;
                plusPrice[itemId] = plusPrice[itemId] + ',' + e.price.toString();
            }
        }
            
        this.setState({
            plus: plus,
            minus: minus,
            plusPrice: plusPrice
        });
        console.log("MitemId",itemId);
        console.log("Mplus",plus);
        console.log("Mminus",minus);
        console.log("plusPrice",plusPrice);
    }


    materialsMinus = (e) => {
        const {itemId} = this.state;
        let {plus} = this.state;
        let {minus} = this.state;
        let {plusPrice} = this.state;
        let doesExist = false;



        
        

        //check if removed Material is already in plus
        if(plus[itemId] !== "NONE"){
            let plusArr = plus[itemId].split(',');
            let plusPriceArr = plusPrice[itemId].split(',');
            for(let i = 0; i<plusArr.length; i++){
                if(plusArr[i] === e){
                    doesExist = true;
                    plusArr.splice(i);
                    plusPriceArr.splice(i);
                    if(plusArr.length !== 0){
                        plus[itemId] = plusArr.join(',');
                        plusPrice[itemId] = plusPriceArr.join(',');
                    }
                    else{
                        plus[itemId] = "NONE";
                        plusPrice[itemId] = "NONE";
                    }
                    break;
                }
            }
        }

        if(!doesExist){

            
            if(minus[itemId] === "NONE"){
                minus[itemId] = e;
            }
            else{
                minus[itemId] = minus[itemId] + ',' + e;
            }
        }
            
        this.setState({
            plus: plus,
            minus: minus,
            plusPrice: plusPrice
        });
        console.log("PitemId",itemId);
        console.log("Pplus",plus);
        console.log("Pminus",minus);
        console.log("plusPrice",plusPrice);
    }
    
    handleNewItemInOrder = (e) => {
        const {itemsInOrderView} = this.state;
            itemsInOrderView.push(e);
            const minus = this.state.minus;
            const plus = this.state.plus;
            const plusPrice = this.state.plusPrice;
            const containsText = e.contains;
            console.log(containsText);
            const countItemsInFood = this.state.countItemsInFood;
            
            if(e.name.includes("Tilboð")){
                const contains = containsText.split(',');
                for(let i = 0; i<contains.length; i++){
                    plusPrice.push("NONE");
                    minus.push("NONE");
                    plus.push("NONE");
                }
                countItemsInFood.push(contains.length);

            }
            else{
                plusPrice.push("NONE");
                plus.push("NONE");
                minus.push("NONE");
                countItemsInFood.push(1);
            }
            this.setState({
                plus: plus,
                minus: minus,
                itemsInOrderView: itemsInOrderView,
                countItemsInFood: countItemsInFood,
            });
        }

    handleOrderViewAction = (e) => {
        if(e === "clear"){
            this.setState({
                minus: [],
                plus: [],
                itemsInOrderView: []
            });
        }
    }

    handleSubmit = async (e) => {
         

    }

    handleMaterialsInFood = (e) => {
        this.setState({
            foodId: e,
        })
    }

    changeFoodToCheck = (e)  =>{
        
        const itemId = e.itemId;
        const foodId = e.foodId;
        if(itemId === this.state.itemId){
            this.setState({
                itemId: -1,
                foodId: -1
            })
        }
        else{

            this.setState({
                itemId: itemId,
                foodId: foodId,
            });
        }
    }

    /** */


    handleButtonClick = (e) => {

        if(e === "finish"){

        }
        if(Array.isArray(e)){
            let food = this.props.foods.result;
            let foodToChange = e[1];
            
            let orderItemToChange = this.state.itemsInOrderView[e[2]];
            let materialsToChange = "";
            food.map(result => {
                if(result.name === foodToChange){
                    materialsToChange = result.contains;
                }
            })

            this.setState({
                foodToChange: foodToChange,
                orderItemToChange: orderItemToChange,
                materialsToChange: materialsToChange,
            })
            
        }
        else if(e === "clear"){
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
        
        
        
      }
      
      


    render() {


        
        switch(this.props.location.hash){
            case '#offers':
                return(
                    <div>
                        <div className = "Navbar" style = {{backgroundColor: 'rgb(255, 188, 5)'}}>
                            <Navbar/>
                        </div>

                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleOrderViewAction}
                                    minus = {this.state.minus} plus = {this.state.plus} plusPrice = {this.state.plusPrice}
                                    countItemsInFood = {this.state.countItemsInFood}
                        />
                        <h1 className = "Menu_title">Tilboð</h1>
                        <div>
                            <Offers  clickHandler={this.handleNewItemInOrder}/>
                            

                        </div>
                    </div>
                    );
            case '#burgers':


                return(
                    <div>
                        <div className = "Navbar" style = {{backgroundColor: 'rgb(255, 188, 5)'}}>
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleOrderViewAction}
                                    minus = {this.state.minus} plus = {this.state.plus} plusPrice = {this.state.plusPrice}
                                    countItemsInFood = {this.state.countItemsInFood}

                        />                        <h1 className = "Menu_title">Borgarar</h1>
                        <Burgers clickHandler={this.handleNewItemInOrder} />
                    </div>
                    );
            case '#boats':


                return(
                    <div>
                        <div className = "Navbar" style = {{backgroundColor: 'rgb(255, 188, 5)'}}>
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleOrderViewAction}
                                    minus = {this.state.minus} plus = {this.state.plus} plusPrice = {this.state.plusPrice}
                                    countItemsInFood = {this.state.countItemsInFood}

                       />                        <h1 className = "Menu_title">Bátar</h1>
                        <Boats clickHandler={this.handleNewItemInOrder} />
                    </div>
                    );

            case '#sandwiches':
                return(
                    <div>
                        <div classname = "Navbar" style = {{backgroundColor: 'rgb(255, 188, 5)'}}>
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleOrderViewAction}
                                    minus = {this.state.minus} plus = {this.state.plus} plusPrice = {this.state.plusPrice}
                                    countItemsInFood = {this.state.countItemsInFood}

                        />                        <h1 className = "Menu_title">Samlokur</h1>
                        <Sandwiches clickHandler={this.handleNewItemInOrder} />
                    </div>
                    );

            case '#changeorder':
                return(
                    <div>
                        <React.Fragment>
                        <ChangeOrder items={this.state.itemsInOrderView}
                            clickHandler = {this.changeFoodToCheck}
                            plus = {this.state.plus}
                            minus = {this.state.minus} />
                        <Materials foodId = {this.state.foodId}
                                    itemId = {this.state.itemId}
                                    plus = {this.state.plus}
                                    minus = {this.state.minus}
                                    plusPrice = {this.state.plusPrice}
                                    minusHandler = {this.materialsMinus}
                                    plusHandler = {this.materialsPlus}

                        />
                        </React.Fragment>
                    </div>
                )
            case '#finishorder':
                    return(
                        <div>
                            <FinishOrder food={this.state.itemsInOrderView} />
                        </div>
                    )
            default:
                return(
                    <div>
                        <div className = "Navbar">
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleOrderViewAction}
                                    minus = {this.state.minus} plus = {this.state.plus} plusPrice = {this.state.plusPrice}
                                    countItemsInFood = {this.state.countItemsInFood}

                        />                        
                        <h1 className = "Menu_title">Tilboð</h1>
                        <Offers clickHandler={this.handleNewItemInOrder} />
                    </div>
                );
            
        }

    }




}

const mapStateToProps1 = (state) => {

    return {
        isFetching: state.getFood.isFetching,
        foods: state.getFood.food,
        message: state.getFood.message
    }
        
}

export default connect(mapStateToProps1)(Menu);