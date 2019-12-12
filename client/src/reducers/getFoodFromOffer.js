import {
    FOODFROMOFFER_REQUEST,
    FOODFROMOFFER_SUCCESS,
    FOODFROMOFFER_FAILURE
  } from '../actions/getFoodFromOffer';


  const initialState = {
      isFetching: false,
      foodInOffer: null,
  }


    export default (state = initialState, action) => {
        switch (action.type) {
        case FOODFROMOFFER_REQUEST:

            return {
              ...state,
              isFetching: action.isFetching,
          };
        case FOODFROMOFFER_SUCCESS:
          return {
            ...state,
             isFetching: action.isFetching,
             foodInOffer: action.foodInOffer,
          }
          case FOODFROMOFFER_FAILURE:
          return{
            ...state,
            isFetching: action.isFetching,
            message: action.message,
        }
        default:
            return state;
    }
  };
