import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



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



export default connect(mapStateToProps1)(SendOrder);