import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';

import Offers from '../../components/offers';
import Burgers from '../../components/burgers';
import {fetchFoods} from '../../actions/getFood'
import {newOrders} from '../../actions/newOrder'
import Materials from '../../components/materials'
import Boats from '../../components/boats';
import Sandwiches from '../../components/sandwiches';
import Navbar from '../../components/navbar';
import OrderView from '../../components/orderView';
import ChangeOrder from '../../components/changeOrder';
import FinishOrder from '../../components/finishOrder';


import './sendOrder.css';







class SendOrder extends Component {

    state = {
        order: null,
        isFetching: false,
        message: null,
        
    }
    
    static propTypes = {
        order: PropTypes.object,
        dispatch: PropTypes.func,
        isFetching: PropTypes.object,
        message: PropTypes.object,
    }


    
    componentDidMount() {
        console.log(this.props.order);
    }

    handleSubmit = async (e) => {
         console.log(e);


    }

    
      
      


    render() {

        const {
            order,
        } = this.props;

        return(
            <h1> hello world </h1>
        )
      
    }





}

const mapStateToProps1 = (state) => {

    return {
        isFetching: state.newOrders.isFetching,
        order: state.newOrders.food,
        message: state.newOrders.message
    }
        
}

const mapStateToProps2 = (state) => {

}

export default connect(mapStateToProps1)(SendOrder);