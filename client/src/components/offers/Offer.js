import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchOffers } from '../../actions/getOffers';
import Button from '../../components/button'
import { fetchFood } from '../../actions/getFood';
import OrderView from '../../components/orderView';



import './offer.css';


class Offer extends Component {

    state = {
        name: "",
        isFetching: false,
        offer: null,
        message: null,
    }

    static propTypes = {
        dispatch: PropTypes.func,
        isFetching: PropTypes.bool,
        offer: PropTypes.object,
        message: PropTypes.object,
        name: "",
    }







    onClick = (name) => {
        this.setState({
            name: name,
        })


        
        
    }
    


    async componentDidMount() {
        const { dispatch } = this.props;
        let offers = await this.props.offer;
        await this.setState({
            offer: offers,
        })
        dispatch(fetchOffers());

    }

    render() {
        const { isFetching, offer } = this.props;
        if (isFetching || !offer) {
            return (
                <div>
                    Sæki tilboð...
                </div>
            );
        }
        let { result } = offer;
        
        
        if(!result){
            return(
                <div>
                    <h2>Síða finnst ekki, vinsamlegast reyndu aftur</h2>
                </div>
            )
        }



    return (
      <div className = "content">
        <ul className = "offer-list">
            <OrderView
            name = {this.state.name}/>

            {result.map(offers =>
                <li key={offers.id}>
                <Button onClick={() => this.onClick(offers.name)}>
                    <div class = "offer-item">
                        <div class = "name">
                            <h2> {offers.name} </h2>
                        </div>
                        <div class = "offerImage">
                            <img src={require('../../Images/Menu-items/' + offers.name + '.png')} alt = "Mynd finst ekki" />

                        </div>
                        <div class = "description">
                            {offers.description}
                        </div>
                        <div class = "price">
                            <span> Verð: </span>
                            {offers.price}

                        </div>
                    </div>
                    
                </Button>
                </li>
                
                

                
            )}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      isFetching: state.getOffers.isFetching,
      offer: state.getOffers.offer,
      message: state.getOffers.message,
    };
  }
  
export default connect(mapStateToProps)(Offer);

