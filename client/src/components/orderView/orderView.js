import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchFoods } from '../../actions/getFood';
import { fetchFood } from '../../actions/getFood';

import Offer from '../offers';


import './orderView.css';


class OrderView extends Component {

    state = {
        name: "",
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
            name: name,
        })
        dispatch(fetchFood(name));
        

    }

    render() {
        
        console.log(this.props.food);
       console.log(this.props);
        
        


    return (
      <div>
    </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
      isFetching: state.getFood.isFetching,
      food: state.getFood.food,
      message: state.getFood.message,

    };
  }

export default connect(mapStateToProps)(OrderView);
