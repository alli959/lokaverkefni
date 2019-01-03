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
        food: null,
    }

    static propTypes = {
        food: PropTypes.object,
    }

    




    async componentDidMount() {
        let foods = await this.props.food;
        await this.setState({
            food: foods,
        })
        console.log(this.props);


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

        console.log(this.state);
        console.log("hello world");
        

    if(food != null){
        return (
        <div>
            <h1>{food.name}</h1>
        </div>
        );
    }
    return(
        <div>
        </div>
    );
  }
}

OrderView.propTypes = {
    food: PropTypes.object,
}


export default withRouter(OrderView);




