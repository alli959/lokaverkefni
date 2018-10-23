import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';
import { fetchOffers } from '../../actions/getOffers'
import './offer.css';

class Offer extends Component {

    state = {
        isFetching: false,
        offer: null,
        message: null,
    }

    static propTypes = {
        dispatch: PropTypes.func,
        isFetching: PropTypes.bool,
        offer: PropTypes.object,
        message: PropTypes.object,
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
        
      <div>

        <ul class = "offer-list">
            {result.map(offers =>
                <li key={offers.id}>
                    <div class = "offer-item">
                        <div class = "name">
                            <span> {offers.name} </span>
                        </div>
                        <div class = "offerImage">
                            <img src={require('../../Images/Menu-items/' + offers.name + '.png')} alt = "Mynd finst ekki" />

                        </div>
                        <div class = "price">
                            {offers.price}

                        </div>
                        <div class = "description">
                            {offers.description}
                        </div>
                    </div>
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

