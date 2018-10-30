import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchFoods } from '../../actions/getFood';
import { fetchFood } from '../../actions/getFood';

import Button from '../../components/button'


import './orderView.css';


class OrderView extends Component {

    /*state = {
        isFetching: false,
        food: null,
        message: null,
    }

    static propTypes = {
        name: PropTypes.string,
        dispatch: PropTypes.func,
        isFetching: PropTypes.bool,
        food: PropTypes.object,
        message: PropTypes.object,
    }










    async componentDidMount() {
        const { dispatch } = this.props;
        let foods = await this.props.food;
        let name = await this.props.name;
        await this.setState({
            food: foods,
        })
        console.log(name);
        dispatch(fetchFood(name));
        

    }*/

    render() {
        const {
            name,
            onClick,
        } = this.props;
       
        console.log(name);
        
        


    return (
      <div>
    </div>
    );
  }
}


OrderView.propTypes = {
    name: PropTypes.string,
}

export default OrderView;
