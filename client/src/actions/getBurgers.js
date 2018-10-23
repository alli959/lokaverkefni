import api from '../api';

export const BURGER_REQUEST = 'BURGER_REQUEST';
export const BURGER_SUCCESS = 'BURGER_SUCCESS';
export const BURGER_FAILURE = 'BURGER_FAILURE';
export const SEARCH_BURGER_SUCCESS = 'SEARCH_BURGER_SUCCESS';


function requestOffer() {
    return {
        type: BURGER_REQUEST,
        isFetching: true,
    }
}

function receiveOffer(burger) {
    return {
      type: BURGER_SUCCESS,
      isFetching: false,
      burger,
    }
  }

function burgerError(message) {
    return {
      type: BURGER_FAILURE,
      isFetching: false,
      message,
    }
  }


export const fetchOffers = () => {
    return async (dispatch) => {

        dispatch(requestOffer());

        let endpoint = '/burgers';

        let burgers;
        try{
            burgers = await api.get(endpoint);
            
        } catch (error) {
            dispatch(burgerError(error));
        }

        if (burgers.status !== 200 || !burgers){
            dispatch(burgerError('fail'))
        }
        dispatch(receiveOffer(burgers));
    }
}