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
        console.log(dispatch);

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
        const { result: { items } } = offer;
        if(!items){
            return(
                <div>
                    <h2>Síða finnst ekki, vinsamlegast reyndu aftur</h2>
                </div>
            )
        }
    

    return (
      <div>
        <ul>
            {this.state.offer.map(offers =>
            <li key={offers.id}>{ offers.name } { offers.description } { offers.price }</li>
            )}
        </ul>
      </div>
    );
  }
}

/*const mapStateToProps = (state) => {
    return {
      isFetching: state.getOffers.isFetching,
      offer: state.getOffers.offer,
      message: state.getOffers.message,
    };
  }
  
export default connect(mapStateToProps)(Offer);
*/
export default Offer;
