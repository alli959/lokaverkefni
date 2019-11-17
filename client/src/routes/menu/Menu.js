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
        foods: null,
        isFetching: false,
        foodToChange: null,
        minus: [],
        plus: [],
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


    /**ACTIONS */
    
    handleNewItemInOrder = (e) => {
        const {itemsInOrderView} = this.state;
    
            itemsInOrderView.push(e);
            const minus = this.state.minus;
            const plus = this.state.plus;
            const containsText = e.contains;
            const tempArr = [];
            if(e.name.includes("Tilboð")){
                const contains = containsText.split(',');
                for(let i = 0; i<contains.length; i++){
                    minus.push("NONE");
                    plus.push("NONE");
                }

            }
            else{
                plus.push("NONE");
                minus.push("NONE");
            }
            this.setState({
                plus: plus,
                minus: minus,
                itemsInOrderView: itemsInOrderView,
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
         console.log("ejamarr",e);

    }

    handleMaterialsInFood = (e) => {
        this.setState({
            foodId: e,
        })
    }

    changeFoodToCheck = (e)  =>{
        console.log("this is the place",e);
        const itemId = e.itemId;
        const foodId = e.foodId;
        this.setState({
            itemId: itemId,
            foodId: foodId,
        });
    }

    /** */


    handleButtonClick = (e) => {

        if(e === "finish"){

        }
        if(Array.isArray(e)){
            let food = this.props.foods.result;
            let foodToChange = e[1];
            console.log("foodToChange", foodToChange);
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
        console.log("itemsInOrderView", this.state.itemsInOrderView);
        console.log("food", this.state.foods);
        
      }
      
      


    render() {


        
        switch(this.props.location.hash){
            case '#offers':
                return(
                    <div>
                        <div className = "Navbar" style = {{backgroundColor: 'rgb(255, 188, 5)'}}>
                            <Navbar />
                        </div>

                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleOrderViewAction} />
                        <h1 className = "Menu_title">Tilboð</h1>
                        <div>
                            <Offers  clickHandler={this.handleNewItemInOrder}/>
                            {console.log("props",this.props)}

                        </div>
                    </div>
                    );
            case '#burgers':


                return(
                    <div>
                        <div className = "Navbar" style = {{backgroundColor: 'rgb(255, 188, 5)'}}>
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleOrderViewAction} />
                        <h1 className = "Menu_title">Borgarar</h1>
                        <Burgers clickHandler={this.handleNewItemInOrder} />
                    </div>
                    );
            case '#boats':


                return(
                    <div>
                        <div className = "Navbar" style = {{backgroundColor: 'rgb(255, 188, 5)'}}>
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleOrderViewAction} />
                        <h1 className = "Menu_title">Bátar</h1>
                        <Boats clickHandler={this.handleNewItemInOrder} />
                    </div>
                    );

            case '#sandwiches':
                return(
                    <div>
                        <div classname = "Navbar" style = {{backgroundColor: 'rgb(255, 188, 5)'}}>
                            <Navbar />
                        </div>
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleOrderViewAction} />
                        <h1 className = "Menu_title">Samlokur</h1>
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
                        <OrderView food={this.state.itemsInOrderView} clickHandler={this.handleButtonClick} />
                        <h1 className = "Menu_title">Tilboð</h1>
                        <Offers clickHandler={this.handleButtonClick} />
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