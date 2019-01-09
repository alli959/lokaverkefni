import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';

import { fetchFoods } from '../../actions/getFood'
import { fetchMaterials } from '../../actions/getMaterials'
import Offers from '../../components/offers';
import Burgers from '../../components/burgers';
import Boats from '../../components/boats';
import Sandwiches from '../../components/sandwiches';
import Navbar from '../../components/navbar';
import OrderView from '../../components/orderView';

import './changeOrder.css';







class Materials extends Component {

    state = {
        isFetching: false,
        material: null,
        message: null,
    }

    static PropTypes = {
        material: PropTypes.object,
        dispatch: PropTypes.func,
        isFetching: PropTypes.object,
        message: PropTypes.object,

        
    }

    async componentDidMount() {
        const { dispatch} = this.props;
        let materials = await this.props.material;
        await this.setState({
            material: materials,
        })
        dispatch(fetchMaterials());
    }


      



    render() {
        const { isFetching, material} = this.props;
        if(isFetching || !material) {
            return (
                <div>
                    sæki álegg...
                </div>
            );
        }
        let result = material.result;


        if(!result){
            return (
                <div>
                    <h2>Síða finnst ekki, vinsamlegast reyndu aftur</h2>
                </div>
            )
        }

        console.log("materials",result);


        return (
            <h1> Hello world </h1>
        )

        

    }
}

const mapStateToProps = (state) => {

    return {
        isFetching: state.getMaterials.isFetching,
        material: state.getMaterials.material,
        message: state.getMaterials.message
    };
        
}

export default connect(mapStateToProps)(Materials);