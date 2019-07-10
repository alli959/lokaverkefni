import api from '../api';

export const OFFER_REQUEST = 'OFFER_REQUEST';
export const OFFER_SUCCESS = 'OFFER_SUCCESS';
export const OFFER_FAILURE = 'OFFER_FAILURE';
export const SEARCH_OFFER_SUCCESS = 'SEARCH_OFFER_SUCCESS';


function requestOffer() {
    return {
        type: OFFER_REQUEST,
        isFetching: true,
    }
}

function receiveOffer(offer) {
    return {
      type: OFFER_SUCCESS,
      isFetching: false,
      offer,
    }
  }

function offerError(message) {
    return {
      type: OFFER_FAILURE,
      isFetching: false,
      message,
    }
  }


export const fetchOffers = () => {
    return async (dispatch) => {

        dispatch(requestOffer());

        let endpoint = '/offers';

        let offers;
        try{
            offers = await api.get(endpoint);
            
        } catch (error) {
            dispatch(offerError(error));
        }

        if (offers.status !== 200 || !offers){
            dispatch(offerError('fail'))
        }
        dispatch(receiveOffer(offers));
    }
}