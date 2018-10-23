import api from '../api';

export const SANDWICH_REQUEST = 'SANDWICH_REQUEST';
export const SANDWICH_SUCCESS = 'SANDWICH_SUCCESS';
export const SANDWICH_FAILURE = 'SANDWICH_FAILURE';
export const SEARCH_SANDWICH_SUCCESS = 'SEARCH_SANDWICH_SUCCESS';


function requestOffer() {
    return {
        type: SANDWICH_REQUEST,
        isFetching: true,
    }
}

function receiveOffer(sandwich) {
    return {
      type: SANDWICH_SUCCESS,
      isFetching: false,
      sandwich,
    }
  }

function sandwichError(message) {
    return {
      type: SANDWICH_FAILURE,
      isFetching: false,
      message,
    }
  }


export const fetchOffers = () => {
    return async (dispatch) => {

        dispatch(requestOffer());

        let endpoint = '/sandwiches';

        let sandwiches;
        try{
            sandwiches = await api.get(endpoint);
            
        } catch (error) {
            dispatch(sandwichError(error));
        }

        if (sandwiches.status !== 200 || !sandwiches){
            dispatch(sandwichError('fail'))
        }
        dispatch(receiveOffer(sandwiches));
    }
}