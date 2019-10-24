import {
    OFFER_REQUEST,
    OFFER_SUCCESS,
    OFFER_FAILURE
  } from '../actions/getOffers';


  const initialState = {
      isFetching: false,
      offer: null,
  }


    export default (state = initialState, action) => {
        switch (action.type) {
        case OFFER_REQUEST:

            return {
              ...state,
              isFetching: action.isFetching,
          };
        case OFFER_SUCCESS:
          return {
            ...state,
             isFetching: action.isFetching,
             offer: action.offer,
          }
          case OFFER_FAILURE:
          return{
            ...state,
            isFetching: action.isFetching,
            message: action.message,
        }
        default:
            return state;
    }
  };
